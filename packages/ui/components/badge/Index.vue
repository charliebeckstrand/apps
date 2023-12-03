<script setup lang="ts">
import { computed } from 'vue'

type Size = 'sm' | 'md' | 'lg'
type Variant = 'default' | 'tonal' | 'outlined' | 'ghost'
type Color = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | 'info' | 'orange'

interface Props {
	size?: Size
	variant?: Variant
	color?: Color
}

const props = withDefaults(defineProps<Props>(), {
	size: 'md',
	variant: 'default',
	color: undefined
})

const baseClasses = computed<string>(() => {
	const classes = `ui-badge inline-flex rounded-md px-1.5 py-0.5 border ${
		props.variant === 'ghost' ? 'border-transparent' : null
	}`

	return classes
})

const sizeClasses = computed<string>(() => {
	const classes: Record<Size, string> = {
		sm: 'text-sm',
		md: 'text-base',
		lg: 'text-lg'
	} as const

	return classes[props.size]
})

const colorClasses = computed<string | undefined>(() => {
	const variants: Record<Variant, Record<Color, string>> = {
		default: {
			primary: 'bg-primary text-white',
			secondary: 'bg-secondary text-white',
			accent: 'bg-accent text-white',
			success: 'bg-success text-white',
			warning: 'bg-warning text-white',
			danger: 'bg-danger text-white',
			info: 'bg-info text-white',
			orange: 'bg-orange text-white'
		},
		tonal: {
			primary: 'bg-primary/10 text-primary border-primary/20',
			secondary: 'bg-secondary/10 text-secondary border-secondary/20',
			accent: 'bg-accent/10 text-accent border-accent/20',
			success: 'bg-success/10 text-success border-success/20',
			warning: 'bg-warning/10 text-default border-warning/20',
			danger: 'bg-danger/10 text-danger border-danger/20',
			info: 'bg-info/10 text-info border-info/20',
			orange: 'bg-orange/10 text-orange border-orange/20'
		},
		outlined: {
			primary: 'bg-transparent text-primary border border-primary',
			secondary: 'bg-transparent text-secondary border border-secondary',
			accent: 'bg-transparent text-accent border border-accent',
			success: 'bg-transparent text-success border border-success',
			warning: 'bg-transparent text-default border border-warning',
			danger: 'bg-transparent text-danger border border-danger',
			info: 'bg-transparent text-info border border-info',
			orange: 'bg-transparent text-orange border border-orange'
		},
		ghost: {
			primary: 'bg-transparent text-primary',
			secondary: 'bg-transparent text-secondary',
			accent: 'bg-transparent text-accent',
			success: 'bg-transparent text-success',
			warning: 'bg-transparent text-warning',
			danger: 'bg-transparent text-danger',
			info: 'bg-transparent text-info',
			orange: 'bg-transparent text-orange'
		}
	} as const

	return props.color ? variants[props.variant][props.color] : undefined
})
</script>

<template>
	<div :class="[baseClasses, sizeClasses, colorClasses]">
		<slot />
	</div>
</template>

<style scoped lang="scss"></style>
