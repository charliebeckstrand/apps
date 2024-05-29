<script setup lang="ts">
import Button from '@/components/button/Index.vue'
import FormItem from '@/components/form/Item.vue'
import FormInput from '@/components/form/Input.vue'
import Icon from '@/components/icon/Index.vue'
import Label from '@/components/form/Label.vue'

import { computed, toRefs } from 'vue'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'

import type { BorderRadius, Size, Variant } from '@/types/form/input'

type ModelValue = string | number

type Emit = {
	(event: 'update:modelValue', value: ModelValue): void
}

interface Props {
	id: string
	modelValue?: ModelValue
	autocomplete?: string
	borderRadius?: BorderRadius
	placeholder?: string
	size?: Size
	variant?: Variant
}

const emit = defineEmits<Emit>()

const props = withDefaults(defineProps<Props>(), {
	id: '',
	modelValue: '',
	autocomplete: 'off',
	borderRadius: 'md',
	placeholder: 'Password',
	size: 'md',
	variant: 'default'
})

const { autocomplete, borderRadius, modelValue, placeholder, size, variant } = toRefs(props)

const inputValue = computed<ModelValue>({
	get: () => modelValue.value,
	set: (value) => {
		emit('update:modelValue', value)
	}
})

const inputType = ref<'password' | 'text'>('password')

const toggleInputType = () => {
	inputType.value = inputType.value === 'password' ? 'text' : 'password'
}

const id = props.id ? props.id : `password-${useId()}`
</script>

<template>
	<FormItem
		class="form-password"
		:variant="variant"
	>
		<Label
			:for="id"
			:class="{ hidden: !$slots.label }"
		>
			<slot name="label" />
		</Label>
		<FormInput
			:id="id"
			:type="inputType"
			v-model="inputValue"
			:placeholder="placeholder"
			:autocomplete="autocomplete"
			:variant="variant"
			:border-radius="borderRadius"
			:size="size"
		/>
		<template #append>
			<Button
				v-tippy="{ content: inputType === 'password' ? 'Show password' : 'Hide password' }"
				icon
				size="sm"
				class="hover:bg-gray-200"
				@click="toggleInputType"
			>
				<Icon
					:icon="inputType === 'password' ? EyeIcon : EyeSlashIcon"
					size="sm"
				/>
			</Button>
		</template>
	</FormItem>
</template>
