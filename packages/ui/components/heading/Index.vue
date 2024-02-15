<script setup lang="ts">
import { computed } from 'vue'

import { useFontWeight } from '@/composables/useFontWeight'
import { useTextColor } from '@/composables/useTextColor'
import { useTextSize } from '@/composables/useTextSize'

import type { Color, FontWeight, Size, Tag } from '@/types/heading'

interface Props {
	color?: Color
	size?: Size
	tag?: Tag
	weight?: FontWeight
}

const props = withDefaults(defineProps<Props>(), {
	color: 'default',
	tag: 'div',
	size: 'md',
	weight: 'normal'
})

const classes = computed(() => {
	const classes = []

	if (props.color) {
		classes.push(useTextColor(props.color))
	}

	if (props.size) {
		classes.push(useTextSize(props.size))
	}

	if (props.weight) {
		classes.push(useFontWeight(props.weight))
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
