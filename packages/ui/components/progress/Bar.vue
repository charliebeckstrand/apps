<script setup lang="ts">
import { computed } from 'vue'

type Color = 'primary' | 'secondary' | 'accent'
type Size = 'sm' | 'md' | 'lg'

interface Props {
	color?: Color
	size?: Size
	value: number
	showLabel?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	color: 'primary',
	size: 'md',
	value: 0,
	showLabel: false
})

// Define min and max constants
const minValue = 0
const maxValue = 100

// Defined ajusted value, enforced by the min and max values
const adjustedValue = computed<number>(() => {
	if (props.value < minValue) {
		return minValue
	}

	if (props.value > maxValue) {
		return maxValue
	}

	return props.value
})

const baseClasses = computed<string>(() => {
	const classes = 'rounded-full text-center transition-width duration-300'

	return classes
})

const sizeClasses = computed<string | undefined>(() => {
	const baseClasses = 'px-3'

	const sizes: Record<string, string> = {
		sm: 'p-2',
		md: 'p-2.5',
		lg: 'p-3'
	} as const

	const sizesWithText: Record<string, string> = {
		sm: 'py-1',
		md: 'py-1.5',
		lg: 'py-2'
	} as const

	if (props.showLabel) {
		return `${baseClasses} ${sizesWithText[props.size]}`
	}

	return `${baseClasses} ${sizes[props.size]}`
})

const textSizeClasses = computed<string | undefined>(() => {
	const sizes: Record<string, string> = {
		sm: 'text-xs',
		md: 'text-sm',
		lg: 'text-base'
	} as const

	return sizes[props.size]
})

const colorClasses = computed<string | undefined>(() => {
	const colors: Record<Color, string> = {
		primary: 'bg-primary text-white',
		secondary: 'bg-secondary text-white',
		accent: 'bg-accent text-white'
	} as const

	return props.color ? colors[props.color] : undefined
})
</script>

<template>
	<div
		class="bg-gray-300"
		:class="[baseClasses]"
		role="progressbar"
		:aria-valuenow="adjustedValue"
		:aria-valuemin="0"
		:aria-valuemax="100"
	>
		<div
			:style="{ width: `${adjustedValue}%`, minWidth: props.showLabel ? '2.5rem' : undefined }"
			:class="[baseClasses, colorClasses, sizeClasses]"
		>
			<span
				v-if="props.showLabel"
				:class="[textSizeClasses]"
			>
				{{ adjustedValue }}%
			</span>
		</div>
	</div>
</template>

<style scoped lang="scss"></style>
