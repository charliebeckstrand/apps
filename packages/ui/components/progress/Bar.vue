<script setup lang="ts">
import { computed } from 'vue'

import type { Color, Size } from '@/types/progress'

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

const minValue = 0
const maxValue = 100

const adjustedValue = computed<number>(() => {
	if (props.value < minValue) {
		return minValue
	}

	if (props.value > maxValue) {
		return maxValue
	}

	return props.value
})

const baseClasses = computed<string>(() => 'bg-gray-300 rounded-full text-center transition-width duration-300')

const sizeClasses = computed<string | undefined>(() => {
	const baseClasses = 'px-4'

	const sizes: Record<string, string> = {
		sm: 'p-2',
		md: 'p-2.5',
		lg: 'p-3'
	}

	const sizesWithText: Record<string, string> = {
		sm: 'py-1',
		md: 'py-1.5',
		lg: 'py-2'
	}

	if (props.showLabel) {
		return `${baseClasses} ${sizesWithText[props.size]}`
	}

	return `${baseClasses} ${sizes[props.size]}`
})

const textSizeClasses = computed<string | undefined>(() => {
	const sizeMap: Record<string, string> = {
		sm: 'text-xs',
		md: 'text-sm',
		lg: 'text-base'
	}

	return sizeMap[props.size]
})

const colorClasses = computed<string | undefined>(() => {
	const colorMap: Partial<Record<Color, string>> = {
		primary: 'bg-primary text-white',
		secondary: 'bg-secondary text-white',
		accent: 'bg-accent text-white'
	}

	return colorMap[props.color]
})
</script>

<template>
	<div
		role="progressbar"
		:class="[baseClasses]"
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
