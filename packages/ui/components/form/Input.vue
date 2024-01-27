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

const baseClasses = computed<string>(() => 'flex w-full')

const borderRadiusClasses = computed<string>(() => {
	const borderRadiusMap: Record<BorderRadius, string> = {
		sm: 'rounded-sm',
		md: 'rounded-md',
		lg: 'rounded-lg',
		full: 'rounded-full',
		none: 'rounded-none'
	}

	return borderRadiusMap[props.borderRadius]
})

const sizeClasses = computed<string>(() => {
	const sizeMap: Record<string, string> = {
		sm: 'p-2 text-sm',
		md: 'p-3 text-base',
		lg: 'p-4 text-lg'
	}

	return sizeMap[props.size]
})

const variantClasses = computed<string | undefined>(() => {
	const variantMap: Record<Variant, string> = {
		default: 'bg-gray-100',
		outlined: 'border border-gray-300',
		plain: 'bg-transparent'
	}

	return variantMap[props.variant]
})
</script>

<template>
	<input
		v-model="inputValue"
		:class="[baseClasses, borderRadiusClasses, variantClasses, sizeClasses]"
		:autocomplete="props.autocomplete"
	/>
</template>
