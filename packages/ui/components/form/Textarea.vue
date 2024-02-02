<script setup lang="ts">
import { computed } from 'vue'

import type { Resize, Size, Variant } from '@/types/form/textarea'

type Emit = {
	(event: 'update:modelValue', value: string): void
}

interface Props {
	modelValue: string
	variant?: Variant
	size?: Size
	rows?: number | string
	resize?: Resize
}

const emit = defineEmits<Emit>()

const props = withDefaults(defineProps<Props>(), {
	modelValue: '',
	variant: 'default',
	size: 'md',
	rows: 4,
	resize: 'none'
})

const inputValue = computed<string>({
	get: () => props.modelValue,
	set: (value) => {
		emit('update:modelValue', value)
	}
})

const baseClasses = computed<string>(() => 'ui-textarea flex w-full rounded-md resize-none min-h-[48px]')

const resizeClasses = computed<string>(() => {
	const resizeMap: Record<Resize, string> = {
		none: 'resize-none',
		vertical: 'resize-y',
		horizontal: 'resize-x',
		both: 'resize'
	}

	return resizeMap[props.resize]
})

const sizeClasses = computed<string>(() => {
	const sizeMap: Record<string, string> = {
		xs: 'p-1 text-xs',
		sm: 'p-2 text-sm',
		md: 'p-3 text-base',
		lg: 'p-4 text-lg'
	}

	return sizeMap[props.size]
})

const variantClasses = computed<string | undefined>(() => {
	const variantMap: Partial<Record<Variant, string>> = {
		default: 'bg-gray-100',
		outlined: 'border border-gray-300'
	}

	return variantMap[props.variant]
})
</script>

<template>
	<textarea
		v-model="inputValue"
		:class="[baseClasses, resizeClasses, sizeClasses, variantClasses]"
		:rows="props.rows"
	/>
</template>

<style lang="scss" scoped></style>
