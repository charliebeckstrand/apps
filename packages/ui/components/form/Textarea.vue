<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'default' | 'outlined'

interface Props {
	variant?: Variant
	modelValue?: string
	rows?: number | string
}

const props = withDefaults(defineProps<Props>(), {
	variant: 'default',
	modelValue: '',
	rows: 4
})

const baseClasses = computed<string>(() => {
	const classes = 'flex w-full rounded-md p-3 resize-none'

	return classes
})

const variantClasses = computed<string | undefined>(() => {
	const variants: Record<Variant, string> = {
		default: 'bg-gray-100',
		outlined: 'border border-gray-300'
	} as const

	return variants[props.variant]
})

const emit = defineEmits(['update:modelValue'])

const height = computed<string>(() => {
	const heights: Record<Variant, string> = {
		default: 'h-40',
		outlined: 'h-32'
	} as const

	return heights[props.variant]
})

const value = computed<string>({
	get() {
		return props.modelValue
	},
	set(value) {
		emit('update:modelValue', value)
	}
})
</script>

<template>
	<textarea
		v-model="value"
		:class="[baseClasses, variantClasses]"
		:rows="props.rows"
		@input="emit('update:modelValue', value)"
	/>
</template>

<style scoped lang="scss"></style>
