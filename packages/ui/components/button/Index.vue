<script setup lang="ts">
import { computed, resolveComponent } from 'vue'

type Size = 'sm' | 'md' | 'lg'
type Variant = 'default' | 'outlined' | 'tonal' | 'text' | 'plain'
type Color =
	| 'primary'
	| 'secondary'
	| 'accent'
	| 'success'
	| 'warning'
	| 'danger'
	| 'info'
	| 'orange'
	| 'pink'
	| 'white'

interface Props {
	size?: Size
	variant?: Variant
	color?: Color
	icon?: boolean
	disabled?: boolean
	to?: string
	dark?: boolean
	block?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	size: 'md',
	variant: 'default',
	color: undefined,
	icon: false,
	disabled: false,
	to: undefined,
	dark: false,
	block: false
})

const baseClasses = computed<string>(() => {
	const classes = `flex items-center flex-shrink-1 ${props.icon ? 'rounded-full' : 'rounded-md'} ${
		props.dark ? 'text-gray-100 hover:text-white' : null
	} ${props.block ? 'w-full' : null}`

	return classes
})

const sizeClasses = computed<string>(() => {
	const classes: Record<Size, string> = {
		sm: props.icon ? 'p-1' : 'px-2 py-1 text-sm',
		md: props.icon ? 'p-2' : 'px-4 py-2 text-base',
		lg: props.icon ? 'p-3' : 'px-6 py-3 text-lg'
	} as const

	return classes[props.size]
})

const colorClasses = computed<string | undefined>(() => {
	const variants: Record<Variant, Record<Color, string>> = {
		default: {
			primary: 'bg-primary text-white hover:bg-primary/90',
			secondary: 'bg-secondary text-white hover:bg-secondary/90',
			accent: 'bg-accent text-white hover:bg-accent/90',
			success: 'bg-success text-white hover:bg-success/90',
			warning: 'bg-warning text-default hover:bg-warning/90',
			danger: 'bg-danger text-danger hover:bg-danger/90',
			info: 'bg-info text-info hover:bg-info/90',
			orange: 'bg-orange text-orange hover:bg-orange/90',
			pink: 'bg-pink text-pink hover:bg-pink/90',
			white: 'bg-white text-black hover:bg-white/90'
		},
		outlined: {
			primary: 'bg-transparent text-primary border border-primary hover:bg-primary/10',
			secondary: 'bg-transparent text-secondary border border-secondary hover:bg-secondary/10',
			accent: 'bg-transparent text-accent border border-accent hover:bg-accent/10',
			success: 'bg-transparent text-success border border-success hover:bg-success/10',
			warning: 'bg-transparent text-default border border-warning hover:bg-warning/10',
			danger: 'bg-transparent text-danger border border-danger hover:bg-danger/10',
			info: 'bg-transparent text-info border border-info hover:bg-info/10',
			orange: 'bg-transparent text-orange border border-orange hover:bg-orange/10',
			pink: 'bg-transparent text-pink border border-pink hover:bg-pink/10',
			white: 'bg-transparent text-black border border-white hover:bg-white/10'
		},
		tonal: {
			primary: 'bg-primary/10 hover:bg-primary/20 text-primary',
			secondary: 'bg-secondary/10 hover:bg-secondary/20 text-secondary',
			accent: 'bg-accent/10 hover:bg-accent/20 text-accent',
			success: 'bg-success/10 hover:bg-success/20 text-success',
			warning: 'bg-warning/10 hover:bg-warning/20 text-default',
			danger: 'bg-danger/10 hover:bg-danger/20 text-danger',
			info: 'bg-info/10 hover:bg-info/20 text-info',
			orange: 'bg-orange/10 hover:bg-orange/20 text-orange',
			pink: 'bg-pink/10 hover:bg-pink/20 text-pink',
			white: 'bg-white/10 hover:bg-white/20 text-white'
		},
		text: {
			primary: 'text-primary hover:bg-primary/10 bg-transparent',
			secondary: 'text-secondary hover:bg-secondary/10 bg-transparent',
			accent: 'text-accent hover:bg-accent/10 bg-transparent',
			success: 'text-success hover:bg-success/10 bg-transparent',
			warning: 'text-warning hover:bg-warning/10 bg-transparent',
			danger: 'text-danger hover:bg-danger/10 bg-transparent',
			info: 'text-info hover:bg-info/10 bg-transparent',
			orange: 'text-orange hover:bg-orange/10 bg-transparent',
			pink: 'text-pink hover:bg-pink/10 bg-transparent',
			white: 'text-white hover:bg-white/10 bg-transparent'
		},
		plain: {
			primary: 'text-primary text-opacity-75 hover:text-opacity-100',
			secondary: 'text-secondary text-opacity-75 hover:text-opacity-100',
			accent: 'text-accent text-opacity-75 hover:text-opacity-100',
			success: 'text-success text-opacity-75 hover:text-opacity-100',
			warning: 'text-warning text-opacity-75 hover:text-opacity-100',
			danger: 'text-danger text-opacity-75 hover:text-opacity-100',
			info: 'text-info text-opacity-75 hover:text-opacity-100',
			orange: 'text-orange text-opacity-75 hover:text-opacity-100',
			pink: 'text-pink text-opacity-75 hover:text-opacity-100',
			white: 'text-white text-opacity-75 hover:text-opacity-100'
		}
	} as const

	return props.color ? variants[props.variant][props.color] : undefined
})

const disabledClasses = computed<string | undefined>(() =>
	props.disabled ? 'opacity-50 transition-all pointer-events-none' : undefined
)

const elementType = computed(() => {
	return props.to ? resolveComponent('NuxtLink') : 'button'
})
</script>

<template>
	<component
		:class="[baseClasses, sizeClasses, colorClasses, disabledClasses]"
		:disabled="disabled"
		:is="elementType"
		:to="props.to"
	>
		<div class="mr-1 empty:mr-0">
			<slot name="prepend" />
		</div>
		<div>
			<slot />
		</div>

		<div class="ml-1 empty:ml-0">
			<slot name="append" />
		</div>
	</component>
</template>
