<script setup lang="ts">
import { computed, resolveComponent } from 'vue'

type Size = 'sm' | 'md' | 'lg'
type Variant = 'default' | 'outlined' | 'tonal' | 'text' | 'plain'
type Color = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | 'info' | 'orange' | 'pink'

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
		props.dark ? 'text-white' : null
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
			primary: 'bg-primary text-white hover:bg-opacity-90',
			secondary: 'bg-secondary text-white hover:bg-opacity-90',
			accent: 'bg-accent text-white hover:bg-opacity-90',
			success: 'bg-success text-white hover:bg-opacity-90',
			warning: 'bg-warning text-default hover:bg-opacity-90',
			danger: 'bg-danger text-white hover:bg-opacity-90',
			info: 'bg-info text-white hover:bg-opacity-90',
			orange: 'bg-orange text-white hover:bg-opacity-90',
			pink: 'bg-pink text-white hover:bg-opacity-90'
		},
		outlined: {
			primary: 'bg-transparent text-primary border border-primary hover:bg-primary hover:bg-opacity-10',
			secondary: 'bg-transparent text-secondary border border-secondary hover:bg-secondary hover:bg-opacity-10',
			accent: 'bg-transparent text-accent border border-accent hover:bg-accent hover:bg-opacity-10',
			success: 'bg-transparent text-success border border-success hover:bg-success hover:bg-opacity-10',
			warning: 'bg-transparent text-default border border-warning hover:bg-warning hover:bg-opacity-10',
			danger: 'bg-transparent text-danger border border-danger hover:bg-danger hover:bg-opacity-10',
			info: 'bg-transparent text-info border border-info hover:bg-info hover:bg-opacity-10',
			orange: 'bg-transparent text-orange border border-orange hover:bg-orange hover:bg-opacity-10',
			pink: 'bg-transparent text-pink border border-pink hover:bg-pink hover:bg-opacity-10'
		},
		tonal: {
			primary: 'bg-primary bg-opacity-10 hover:bg-opacity-20 text-primary',
			secondary: 'bg-secondary bg-opacity-10 hover:bg-opacity-20 text-secondary',
			accent: 'bg-accent bg-opacity-10 hover:bg-opacity-20 text-accent',
			success: 'bg-success bg-opacity-10 hover:bg-opacity-20 text-success',
			warning: 'bg-warning bg-opacity-10 hover:bg-opacity-20 text-default',
			danger: 'bg-danger bg-opacity-10 hover:bg-opacity-20 text-danger',
			info: 'bg-info bg-opacity-10 hover:bg-opacity-20 text-info',
			orange: 'bg-orange bg-opacity-10 hover:bg-opacity-20 text-orange',
			pink: 'bg-pink bg-opacity-10 hover:bg-opacity-20 text-pink'
		},
		text: {
			primary: 'text-primary hover:bg-primary bg-transparent hover:bg-opacity-10',
			secondary: 'text-secondary hover:bg-secondary bg-transparent hover:bg-opacity-10',
			accent: 'text-accent hover:bg-accent bg-transparent hover:bg-opacity-10',
			success: 'text-success hover:bg-success bg-transparent hover:bg-opacity-10',
			warning: 'text-default hover:bg-warning bg-transparent hover:bg-opacity-10',
			danger: 'text-danger hover:bg-danger bg-transparent hover:bg-opacity-10',
			info: 'text-info hover:bg-info bg-transparent hover:bg-opacity-10',
			orange: 'text-orange hover:bg-orange bg-transparent hover:bg-opacity-10',
			pink: 'text-pink hover:bg-pink bg-transparent hover:bg-opacity-10'
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
			pink: 'text-pink text-opacity-75 hover:text-opacity-100'
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

<style scoped lang="scss"></style>
