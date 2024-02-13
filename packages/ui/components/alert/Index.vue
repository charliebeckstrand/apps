<script setup lang="ts">
import { computed } from 'vue'

import type { Color, Size, Variant } from '@/types/alert'

interface Props {
	color?: Color
	variant?: Variant
	size?: Size
	dark?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	color: 'default',
	variant: 'default',
	size: 'md',
	dark: false
})

const classes = computed<string>(() => {
	const sizeMap: Record<Size, string> = {
		sm: 'p-2',
		md: 'p-3',
		lg: 'p-4'
	}

	const variantMap: Partial<Record<Variant, Record<Color, string>>> = {
		default: {
			default: 'bg-gray-100 text-white',
			primary: 'bg-primary text-white',
			secondary: 'bg-secondary text-white',
			accent: 'bg-accent text-white',
			success: 'bg-success text-white',
			warning: 'bg-warning text-default',
			danger: 'bg-danger text-white',
			info: 'bg-info text-white'
		},
		outlined: {
			default: 'bg-transparent border border-gray-100 text-default',
			primary: 'bg-transparent border border-primary text-primary',
			secondary: 'bg-transparent border border-secondary text-secondary ',
			accent: 'bg-transparent border border-accent text-accent',
			success: 'bg-transparent border border-success text-success',
			warning: 'bg-transparent border border-warning text-default',
			danger: 'bg-transparent border border-danger text-danger',
			info: 'bg-transparent border border-info text-info'
		},
		tonal: {
			default: 'bg-gray-100/50 text-default',
			primary: 'bg-primary/10 text-primary',
			secondary: 'bg-secondary/10 text-secondary',
			accent: 'bg-accent/10 text-accent',
			success: 'bg-success/10 text-success',
			warning: 'bg-warning/10 text-default',
			danger: 'bg-danger/10 text-danger',
			info: 'bg-info/10 text-info'
		},
		plain: {
			default: 'bg-transparent text-default',
			primary: 'bg-transparent text-primary',
			secondary: 'bg-transparent text-secondary',
			accent: 'bg-transparent text-accent',
			success: 'bg-transparent text-success',
			warning: 'bg-transparent text-default',
			danger: 'bg-transparent text-danger',
			info: 'bg-transparent text-info'
		}
	}

	const classes = ['rounded-md']

	if (props.dark) {
		classes.push('text-white')
	}

	if (props.size) {
		classes.push(sizeMap[props.size])
	}

	if (props.variant && props.color) {
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
		<UIHeading
			v-if="$slots['title']"
			size="lg"
			weight="bold"
		>
			<slot name="title" />
		</UIHeading>
		<slot />
	</div>
</template>
