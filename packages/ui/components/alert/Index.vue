<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'default' | 'outlined' | 'tonal'
type Color = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger'

interface Props {
	variant?: Variant
	color?: Color
	dark?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	variant: 'default',
	color: undefined,
	dark: false
})

const baseClasses = computed<string>(() => {
	const classes = `rounded-md p-3 ${props.dark ? 'text-white' : null}`

	return classes
})

const colorClasses = computed<string | undefined>(() => {
	const variants: Record<Variant, Record<Color, string>> = {
		default: {
			primary: 'bg-primary text-white',
			secondary: 'bg-secondary text-white',
			accent: 'bg-accent text-white',
			success: 'bg-success text-white',
			warning: 'bg-warning',
			danger: 'bg-danger text-white'
		},
		outlined: {
			primary: 'bg-transparent text-primary border border-primary',
			secondary: 'bg-transparent text-secondary border border-secondary',
			accent: 'bg-transparent text-accent border border-accent',
			success: 'bg-transparent text-success border border-success',
			warning: 'bg-transparent border border-warning',
			danger: 'bg-transparent text-danger border border-danger'
		},
		tonal: {
			primary: 'bg-primary bg-opacity-10 text-primary',
			secondary: 'bg-secondary bg-opacity-10 text-secondary',
			accent: 'bg-accent bg-opacity-10 text-accent',
			success: 'bg-success bg-opacity-10 text-success',
			warning: 'bg-warning bg-opacity-10',
			danger: 'bg-danger bg-opacity-10 text-danger'
		}
	} as const

	return props.color ? variants[props.variant][props.color] : undefined
})
</script>

<template>
	<div :class="[baseClasses, colorClasses]">
		<div class="text-lg font-bold">
			<slot name="title" />
		</div>
		<slot />
	</div>
</template>
