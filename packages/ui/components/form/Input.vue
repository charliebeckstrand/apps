<script setup lang="ts">
import { computed } from 'vue'

import type { BorderRadius, Size, Variant } from '@/types/form/input'

type ModelValue = string | number

type Emit = {
	(event: 'update:modelValue', value: ModelValue): void
}

interface Props {
	modelValue?: ModelValue
	variant?: Variant
	size?: Size
	borderRadius?: BorderRadius
	autocomplete?: string
}

const emit = defineEmits<Emit>()

const props = withDefaults(defineProps<Props>(), {
	modelValue: '',
	variant: 'default',
	size: 'md',
	borderRadius: 'md',
	autocomplete: 'one-time-code'
})

const inputValue = computed<ModelValue>({
	get: () => props.modelValue,
	set: (value) => {
		emit('update:modelValue', value)
	}
})

const classes = computed<string>(() => {
	const borderRadiusMap: Record<BorderRadius, string> = {
		sm: 'rounded-sm',
		md: 'rounded-md',
		lg: 'rounded-lg',
		full: 'rounded-full',
		none: 'rounded-none'
	}

	const sizeMap: Record<string, string> = {
		sm: 'p-2 text-sm',
		md: 'p-3 text-base',
		lg: 'p-4 text-lg'
	}

	const variantMap: Record<Variant, string> = {
		default: 'bg-gray-100',
		outlined: 'border border-gray-300',
		tonal: 'bg-gray-50',
		plain: 'bg-transparent'
	}

	const classes = ['flex w-full']

	if (props.borderRadius) {
		classes.push(borderRadiusMap[props.borderRadius])
	}

	if (props.size) {
		classes.push(sizeMap[props.size])
	}

	if (props.variant) {
		classes.push(variantMap[props.variant])
	}

	return classes.join(' ')
})
</script>

<template>
	<input
		v-model="inputValue"
		:class="classes"
		:autocomplete="props.autocomplete"
	/>
</template>
