<script setup lang="ts">
import Heading from '@/components/heading/Index.vue'

import { computed } from 'vue'

import { paddingMap, variantMap } from '@/constants'

import type { Color, Size, Variant } from '@/types/alert'

interface Props {
	color?: Color
	padding?: Size
	variant?: Variant
	dark?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	color: 'default',
	padding: 'md',
	variant: 'default',
	dark: false
})

const classes = computed<string>(() => {
	const classes = ['rounded-md']

	if (props.dark) {
		classes.push('text-white')
	}

	if (props.padding) {
		classes.push(paddingMap[props.padding])
	}

	if (props.variant) {
		const variant = variantMap[props.variant]

		if (variant) {
			const color = variant[props.color]

			if (color) {
				classes.push(color)
			}
		}
	}

	return classes.join(' ')
})
</script>

<template>
	<div :class="classes">
		<Heading
			v-if="$slots['title']"
			size="lg"
			weight="bold"
		>
			<slot name="title" />
		</Heading>
		<slot />
	</div>
</template>
