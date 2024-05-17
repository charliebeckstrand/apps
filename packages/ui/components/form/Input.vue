<script setup lang="ts">
import Label from '@/components/form/Label.vue'

import { computed, toRefs } from 'vue'

import { useBorderRadius } from '@/composables/useBorderRadius'
import { useTailwindClasses } from '@/composables/useTailwindClasses'
import { usePadding } from '@/composables/usePadding'
import { useTextSize } from '@/composables/useTextSize'
import { useVariant } from '@/composables/form/useVariant'

import type { BorderRadius, Size, Variant } from '@/types/form/input'

type ModelValue = string | number

type Emit = {
	(event: 'update:modelValue', value: ModelValue): void
}

interface Props {
	id?: string
	autocomplete?: string
	modelValue?: ModelValue
	rounded?: BorderRadius
	size?: Size
	variant?: Variant
}

const emit = defineEmits<Emit>()

const props = withDefaults(defineProps<Props>(), {
	id: undefined,
	autocomplete: 'one-time-code',
	modelValue: '',
	rounded: 'md',
	size: 'md',
	variant: 'default'
})

const { autocomplete, modelValue, rounded, size, variant } = toRefs(props)

const inputValue = computed<ModelValue>({
	get: () => modelValue.value,
	set: (value) => {
		emit('update:modelValue', value)
	}
})

const inputRef = ref<HTMLInputElement | null>(null)
const id = props.id ? props.id : `input-${useId()}`

defineExpose({
	focus: () => inputRef.value?.focus()
})
</script>

<template>
	<div class="flex w-full flex-col">
		<Label
			:for="id"
			:class="{ hidden: !$slots.label }"
		>
			<slot name="label" />
		</Label>
		<input
			ref="inputRef"
			v-model="inputValue"
			v-bind="$attrs"
			:class="[
				'flex w-full',
				useTailwindClasses([useBorderRadius(rounded), usePadding(size), useTextSize(size), useVariant(variant)])
			]"
			:autocomplete="autocomplete"
		/>
	</div>
</template>
