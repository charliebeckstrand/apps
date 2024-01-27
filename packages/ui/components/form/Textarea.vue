<script setup lang="ts">
import { computed } from 'vue'

import type { Resize, Variant } from '@/types/form/textarea'

type Emit = {
	(event: 'update:modelValue', value: string): void
}

interface Props {
	modelValue: string
	variant?: Variant
	rows?: number | string
	resize?: Resize
}

const emit = defineEmits<Emit>()

const props = withDefaults(defineProps<Props>(), {
	modelValue: '',
	variant: 'default',
	rows: 4,
	resize: 'none'
})

const inputValue = computed<string>({
	get: () => props.modelValue,
	set: (value) => {
		emit('update:modelValue', value)
	}
})

const baseClasses = computed<string>(() => 'ui-textarea flex w-full rounded-md p-4 resize-none min-h-[48px]')

const resizeClasses = computed<string>(() => {
	const resizeMap: Record<Resize, string> = {
		none: 'resize-none',
		vertical: 'resize-y',
		horizontal: 'resize-x',
		both: 'resize'
	}

	return resizeMap[props.resize]
})

const variantClasses = computed<string | undefined>(() => {
	const variantMap: Record<Variant, string> = {
		default: 'bg-gray-100',
		outlined: 'border border-gray-300'
	}

	return variantMap[props.variant]
})
</script>

<template>
	<textarea
		v-model="inputValue"
		:class="[baseClasses, resizeClasses, variantClasses]"
		:rows="props.rows"
	/>
</template>

<style lang="scss" scoped></style>
