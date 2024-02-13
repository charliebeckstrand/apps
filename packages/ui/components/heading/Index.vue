<script setup lang="ts">
import { computed } from 'vue'

import type { Size, Weight } from '@/types/heading'

type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span'

interface Props {
	tag?: Tag
	size?: Size
	weight?: Weight
}

const props = withDefaults(defineProps<Props>(), {
	tag: 'div',
	size: 'md',
	weight: 'normal'
})

const classes = computed(() => {
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

	const classes = []

	if (props.size) {
		classes.push(sizeMap[props.size])
	}

	if (props.weight) {
		classes.push(weightMap[props.weight])
	}

	return classes.join(' ')
})

const elementType = computed(() => (props.tag as string).toLowerCase())
</script>

<template>
	<component
		:is="elementType"
		:class="classes"
	>
		<slot />
	</component>
</template>
