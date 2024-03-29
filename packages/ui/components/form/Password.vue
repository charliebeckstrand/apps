<script setup lang="ts">
import { computed } from 'vue'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'

import Button from '@/components/button/Index.vue'
import FormItem from '@/components/form/Item.vue'
import FormInput from '@/components/form/Input.vue'
import Icon from '@/components/icon/Index.vue'

import type { BorderRadius, Size, Variant } from '@/types/form/input'

type ModelValue = string | number

type Emit = {
	(event: 'update:modelValue', value: ModelValue): void
}

interface Props {
	autocomplete?: string
	borderRadius?: BorderRadius
	id: string
	modelValue?: ModelValue
	placeholder?: string
	size?: Size
	variant?: Variant
}

const emit = defineEmits<Emit>()

const props = withDefaults(defineProps<Props>(), {
	autocomplete: 'one-time-code',
	borderRadius: 'md',
	id: '',
	modelValue: '',
	placeholder: 'Password',
	size: 'md',
	variant: 'default'
})

const inputValue = computed<ModelValue>({
	get: () => props.modelValue,
	set: (value) => {
		emit('update:modelValue', value)
	}
})

const inputType = ref<'password' | 'text'>('password')

const toggleInputType = () => {
	inputType.value = inputType.value === 'password' ? 'text' : 'password'
}
</script>

<template>
	<FormItem :variant="props.variant">
		<FormInput
			:id="props.id"
			:type="inputType"
			v-model="inputValue"
			:placeholder="props.placeholder"
			:autocomplete="props.autocomplete"
			:variant="props.variant"
			:border-radius="props.borderRadius"
			:size="props.size"
		/>
		<template #append>
			<Button
				v-tippy="{ content: inputType === 'password' ? 'Show password' : 'Hide password' }"
				icon
				size="sm"
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
