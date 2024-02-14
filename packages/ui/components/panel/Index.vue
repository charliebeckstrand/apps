<script setup lang="ts">
import { borderRadiusMap, paddingMap, variantMap } from '@/constants/mapping'

import type { BorderRadius, Color, Padding, Variant } from '@/types/panel'

interface Props {
	color?: Color
	rounded?: BorderRadius
	padding?: Padding
	variant?: Variant
}

const props = withDefaults(defineProps<Props>(), {
	color: 'default',
	rounded: 'md',
	padding: 'md',
	variant: 'default'
})

const classes = computed<string>(() => {
	const classes = []

	if (props.rounded) {
		classes.push(borderRadiusMap[props.rounded])
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
		<slot />
	</div>
</template>
