<script setup lang="ts">
import { computed } from 'vue'

import { fontWeightMap } from '@/constants'

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
	const textSizeMap: Record<Size, string> = {
		xs: 'text-xs',
		sm: 'text-sm',
		md: 'text-md',
		lg: 'text-lg',
		xl: 'text-xl',
		'2xl': 'text-2xl',
		'3xl': 'text-3xl',
		'4xl': 'text-4xl'
	}

	const classes = []

	if (props.size) {
		classes.push(textSizeMap[props.size])
	}

	if (props.weight) {
		classes.push(fontWeightMap[props.weight])
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
