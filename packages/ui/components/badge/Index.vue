<script setup lang="ts">
import { computed } from 'vue'

import { borderRadiusMap, textSizeMap, variantMap } from '@/constants/mapping'

import type { BorderRadius, Color, Size, Variant } from '@/types/badge'

interface Props {
	color?: Color
	rounded?: BorderRadius
	size?: Size
	variant?: Variant
}

const props = withDefaults(defineProps<Props>(), {
	color: 'default',
	rounded: 'md',
	size: 'md',
	variant: 'default'
})

const classes = computed<string>(() => {
	const classes = ['ui-badge inline-flex space-x-1 items-center px-1.5 py-0.5 border']

	if (props.rounded) {
		classes.push(borderRadiusMap[props.rounded])
	}

	if (props.size) {
		classes.push(textSizeMap[props.size])
	}

	if (props.variant) {
		const variant = variantMap[props.variant]

		if (variant) {
			const color = variant[props.color]

			classes.push(color)
		}

		if (props.variant === 'plain') {
			classes.push('border-transparent')
		}
	}

	return classes.join(' ')
})
</script>

<template>
	<div :class="classes">
		<div v-if="$slots['prepend']">
			<slot name="prepend" />
		</div>

		<div>
			<slot />
		</div>

		<div v-if="$slots['append']">
			<slot name="append" />
		</div>
	</div>
</template>
