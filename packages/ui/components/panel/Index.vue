<script setup lang="ts">
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
	const variantMap: Record<Variant, Partial<Record<Color, string>>> = {
		default: {
			default: 'bg-gray-100 text-base',
			primary: 'bg-primary text-white',
			secondary: 'bg-secondary text-white',
			accent: 'bg-accent text-white'
		},
		outlined: {
			default: 'bg-transparent border border-gray-300 text-base',
			primary: 'bg-transparent border border-primar text-primaryy',
			secondary: 'bg-transparent border border-secondary text-secondary',
			accent: 'bg-transparent border border-accent text-accent'
		},
		tonal: {
			default: 'bg-gray-50 text-base',
			primary: 'bg-primary/10 text-primary',
			secondary: 'bg-secondary/10 text-secondary',
			accent: 'bg-accent/10 text-accent'
		},
		plain: {
			default: 'text-base',
			primary: 'text-primary',
			secondary: 'text-secondary',
			accent: 'text-accent'
		}
	}

	const borderRadiusMap: Record<BorderRadius, string> = {
		sm: 'rounded-sm',
		md: 'rounded-md',
		lg: 'rounded-lg',
		full: 'rounded-full',
		none: 'rounded-none'
	}

	const paddingMap: Record<Padding, string> = {
		sm: 'p-3',
		md: 'p-4',
		lg: 'p-5',
		none: 'p-0'
	}

	const classes = ['ui-panel']

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
