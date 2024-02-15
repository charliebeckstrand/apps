<script setup lang="ts">
import { useBorderRadius } from '@/composables/useBorderRadius'
import { usePadding } from '@/composables/usePadding'
import { useTextColor } from '@/composables/useTextColor'
import { useVariant } from '@/composables/useVariant'

import type { BorderRadius, Color, Padding, Variant } from '@/types/panel'

interface Props {
	color?: Color
	textColor?: Color
	rounded?: BorderRadius
	padding?: Padding
	variant?: Variant
}

const props = withDefaults(defineProps<Props>(), {
	color: 'default',
	textColor: 'default',
	rounded: 'md',
	padding: 'md',
	variant: 'default'
})

const classes = computed<string>(() => {
	const classes = []

	if (props.rounded) {
		classes.push(useBorderRadius(props.rounded))
	}

	if (props.padding) {
		classes.push(usePadding(props.padding))
	}

	if (props.textColor) {
		classes.push(useTextColor(props.textColor))
	}

	if (props.variant) {
		const variant = useVariant(props.variant)

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
