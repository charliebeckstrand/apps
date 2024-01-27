<script setup lang="ts">
import { computed } from 'vue'

import type { Size, Weight } from '@/types/heading'

interface Props {
	size?: Size
	weight?: Weight
}

const props = withDefaults(defineProps<Props>(), {
	size: 'md',
	weight: 'normal'
})

const sizeClasses = computed(() => {
	const sizeMap: Record<Size, string> = {
		xs: 'text-xs',
		sm: 'text-sm',
		md: 'text-md',
		lg: 'text-lg',
		xl: 'text-xl',
		'2xl': 'text-2xl',
		'3xl': 'text-3xl',
		'4xl': 'text-4xl'
	}

	return sizeMap[props.size]
})

const weightClasses = computed(() => {
	const weightMap: Record<Weight, string> = {
		thin: 'font-thin',
		extralight: 'font-extralight',
		light: 'font-light',
		normal: 'font-normal',
		medium: 'font-medium',
		semibold: 'font-semibold',
		bold: 'font-bold',
		extrabold: 'font-extrabold',
		black: 'font-black'
	}

	return weightMap[props.weight]
})
</script>

<template>
	<div :class="[sizeClasses, weightClasses]">
		<slot />
	</div>
</template>
