<script setup lang="ts">
import { useBackgroundColor } from '@/composables/useBackgroundColor'
import { useTextSize } from '@/composables/useTextSize'

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

const classes = computed<string>(() => {
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

	const classes = [...baseClasses.value, 'px-4']

	if (props.color) {
		classes.push(useBackgroundColor(props.color))
	}

	if (props.showLabel) {
		classes.push(sizesWithText[props.size])
	} else {
		classes.push(sizes[props.size])
	}

	return classes.join(' ')
})

const textSizeClasses = computed<string | undefined>(() => useTextSize(props.size))
</script>

<template>
	<div
		role="progressbar"
		:class="baseClasses"
		:aria-valuenow="adjustedValue"
		:aria-valuemin="0"
		:aria-valuemax="100"
	>
		<div
			:style="{ width: `${adjustedValue}%`, minWidth: props.showLabel ? '2.5rem' : undefined }"
			:class="classes"
		>
			<span
				v-if="props.showLabel"
				:class="textSizeClasses"
			>
				{{ adjustedValue }}%
			</span>
		</div>
	</div>
</template>
