<script setup lang="ts">
import { computed } from 'vue'

import type { BorderRadius, Color, Size, Variant } from '@/types/badge'

interface Props {
	size?: Size
	variant?: Variant
	color?: Color
	rounded?: BorderRadius
}

const props = withDefaults(defineProps<Props>(), {
	size: 'md',
	variant: 'default',
	color: 'default',
	rounded: 'md'
})

const baseClasses = computed<string>(
	() =>
		`ui-badge inline-flex space-x-1 items-center px-1.5 py-0.5 border text-sm ${
			props.variant === 'plain' ? 'border-transparent' : undefined
		}`
)

const borderRadiusClasses = computed<string>(() => {
	const borderRadiusMap: Record<BorderRadius, string> = {
		sm: 'rounded-sm',
		md: 'rounded-md',
		lg: 'rounded-lg',
		full: 'rounded-full',
		none: 'rounded-none'
	}

	return borderRadiusMap[props.rounded]
})

const colorClasses = computed<string | undefined>(() => {
	const variantMap: Record<Variant, Record<Color, string>> = {
		default: {
			default: 'bg-gray-100 text-gray-800',
			primary: 'bg-primary text-white',
			secondary: 'bg-secondary text-white',
			accent: 'bg-accent text-white',
			success: 'bg-success text-white',
			warning: 'bg-warning text-base',
			danger: 'bg-danger text-white',
			info: 'bg-info text-base'
		},
		tonal: {
			default: 'bg-gray-50 text-gray-800',
			primary: 'bg-primary/10 text-primary border-primary/20',
			secondary: 'bg-secondary/10 text-secondary border-secondary/20',
			accent: 'bg-accent/10 text-accent border-accent/20',
			success: 'bg-success/10 text-success border-success/20',
			warning: 'bg-warning/10 text-default border-warning/20',
			danger: 'bg-danger/10 text-danger border-danger/20',
			info: 'bg-info/10 text-info border-info/20'
		},
		outlined: {
			default: 'bg-transparent text-gray-800 border border-gray-300',
			primary: 'bg-transparent text-primary border border-primary',
			secondary: 'bg-transparent text-secondary border border-secondary',
			accent: 'bg-transparent text-accent border border-accent',
			success: 'bg-transparent text-success border border-success',
			warning: 'bg-transparent text-default border border-warning',
			danger: 'bg-transparent text-danger border border-danger',
			info: 'bg-transparent text-info border border-info'
		},
		plain: {
			default: 'bg-transparent text-gray-800',
			primary: 'bg-transparent text-primary',
			secondary: 'bg-transparent text-secondary',
			accent: 'bg-transparent text-accent',
			success: 'bg-transparent text-success',
			warning: 'bg-transparent text-warning',
			danger: 'bg-transparent text-danger',
			info: 'bg-transparent text-info'
		}
	}

	return variantMap[props.variant][props.color]
})

const sizeClasses = computed<string>(() => {
	const sizeMap: Record<Size, string> = {
		sm: 'text-sm',
		md: 'text-base',
		lg: 'text-lg'
	}

	return sizeMap[props.size]
})
</script>

<template>
	<div :class="[baseClasses, borderRadiusClasses, sizeClasses, colorClasses]">
		<div class="mr-1 empty:mr-0">
			<slot name="prepend" />
		</div>
		<div>
			<slot />
		</div>
		<div class="ml-1 empty:ml-0">
			<slot name="append" />
		</div>
	</div>
</template>
