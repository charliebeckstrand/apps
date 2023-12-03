<script setup lang="ts">
import { computed } from 'vue'

type Size = 'xs' | 'sm' | 'md' | 'lg'
type Variant = 'default' | 'outlined' | 'plain'

interface Props {
	modelValue?: string | number
	variant?: Variant
	size?: Size
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: '',
	variant: 'default',
	size: 'md'
})

const baseClasses = computed<string>(() => {
	const classes = 'flex w-full rounded-md p-3'

	return classes
})

const variantClasses = computed<string | undefined>(() => {
	const variants: Record<Variant, string> = {
		default: 'bg-gray-100',
		outlined: 'border border-gray-300',
		plain: 'bg-transparent'
	} as const

	return variants[props.variant]
})

const sizeClasses = computed<string>(() => {
	const classes: Record<string, string> = {
		xs: 'text-xs',
		sm: 'text-sm',
		md: 'text-base',
		lg: 'text-lg'
	} as const

	return classes[props.size]
})

const emit = defineEmits(['update:modelValue'])

const value = ref(props.modelValue)

watch(
	() => props.modelValue,
	() => {
		value.value = props.modelValue
	}
)

watch(
	() => value.value,
	() => {
		emit('update:modelValue', value.value)
	}
)
</script>

<template>
	<input
		v-model="value"
		:class="[baseClasses, variantClasses, sizeClasses]"
	/>
</template>

<style scoped lang="scss"></style>
