<script setup lang="ts">
import { computed } from 'vue'

import { useBackgroundColor } from '@/composables/useBackgroundColor'
import { useTailwindClasses } from '@/composables/useTailwindClasses'
import { useTextSize } from '@/composables/useTextSize'

import type { Color, Size } from '@/types/progress'

interface Props {
	color?: Color
	size?: Size
	showLabel?: boolean
	value: number
}

const props = withDefaults(defineProps<Props>(), {
	color: 'primary',
	size: 'md',
	showLabel: false,
	value: 0
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
</script>

<template>
	<div
		class="transition-width rounded-full bg-gray-300 text-center duration-300"
		role="progressbar"
		:aria-valuemax="100"
		:aria-valuemin="0"
		:aria-valuenow="adjustedValue"
	>
		<div
			:style="{ width: `${adjustedValue}%`, minWidth: props.showLabel ? '2.5rem' : undefined }"
			:class="[
				useTailwindClasses([
					useBackgroundColor(props.color),
					[props.showLabel, sizesWithText[props.size]],
					[!props.showLabel, sizes[props.size]]
				]),
				'transition-width rounded-full bg-gray-300 px-4 text-center duration-300'
			]"
		>
			<span
				v-if="props.showLabel"
				:class="useTailwindClasses([useTextSize(props.size)])"
			>
				{{ adjustedValue }}%
			</span>
		</div>
	</div>
</template>
