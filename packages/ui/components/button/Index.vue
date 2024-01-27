<script setup lang="ts">
import { computed } from 'vue'

import type { BorderRadius, Color, Size, Variant } from '@/types/button'

interface Props {
	variant?: Variant
	color?: Color
	textColor?: Color
	size?: Size
	icon?: boolean
	to?: string
	dark?: boolean
	block?: boolean
	rounded?: BorderRadius
	disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	variant: 'default',
	color: 'default',
	textColor: undefined,
	size: 'md',
	icon: false,
	to: undefined,
	dark: false,
	block: false,
	rounded: 'md',
	disabled: false
})

const baseClasses = computed<string>(
	() =>
		`flex items-center flex-shrink-1 ${
			!props.color && !props.icon
				? 'hover:underline'
				: props.icon && !props.dark
				? 'hover:bg-gray-100'
				: props.icon && props.dark
				? 'hover:bg-gray-100/10'
				: undefined
		} ${props.block ? 'w-full' : undefined}`
)

const borderRadiusClasses = computed<string | undefined>(() => {
	const borderRadiusMap: Record<BorderRadius, string | undefined> = {
		sm: 'rounded-sm',
		md: 'rounded-md',
		lg: 'rounded-lg',
		full: 'rounded-full',
		none: 'rounded-none'
	}

	return props.icon ? 'rounded-full justify-center' : borderRadiusMap[props.rounded]
})

const backgroundColorClasses = computed<string | undefined>(() => {
	const backgroundVariantMap: Record<Variant, Record<Color, string>> = {
		default: {
			default: 'bg-gray-100 hover:bg-gray-200',
			primary: 'bg-primary hover:bg-primary/90',
			secondary: 'bg-secondary hover:bg-secondary/90',
			accent: 'bg-accent hover:bg-accent/90',
			success: 'bg-success hover:bg-success/90',
			warning: 'bg-warning hover:bg-warning/90',
			danger: 'bg-danger hover:bg-danger/90',
			info: 'bg-info hover:bg-info/90',
			pink: 'bg-pink hover:bg-pink/90',
			white: 'bg-white hover:bg-white/90'
		},
		outlined: {
			default: 'bg-transparent border-gray-300 hover:bg-gray-100',
			primary: 'bg-transparent border border-primary hover:bg-primary/10',
			secondary: 'bg-transparent border border-secondary hover:bg-secondary/10',
			accent: 'bg-transparent border border-accent hover:bg-accent/10',
			success: 'bg-transparent border border-success hover:bg-success/10',
			warning: 'bg-transparent border border-warning hover:bg-warning/10',
			danger: 'bg-transparent border border-danger hover:bg-danger/10',
			info: 'bg-transparent border border-info hover:bg-info/10',
			pink: 'bg-transparent border border-pink hover:bg-pink/10',
			white: 'bg-transparent border border-white hover:bg-white/10'
		},
		tonal: {
			default: 'bg-gray-50 hover:bg-gray-100',
			primary: 'bg-primary/10 hover:bg-primary/20',
			secondary: 'bg-secondary/10 hover:bg-secondary/20',
			accent: 'bg-accent/10 hover:bg-accent/20',
			success: 'bg-success/10 hover:bg-success/20',
			warning: 'bg-warning/10 hover:bg-warning/20',
			danger: 'bg-danger/10 hover:bg-danger/20',
			info: 'bg-info/10 hover:bg-info/20',
			pink: 'bg-pink/10 hover:bg-pink/20',
			white: 'bg-white/10 hover:bg-white/20'
		},
		text: {
			default: 'text-base hover:bg-gray-100 bg-transparent',
			primary: 'text-primary hover:bg-primary/10 bg-transparent',
			secondary: 'text-secondary hover:bg-secondary/10 bg-transparent',
			accent: 'text-accent hover:bg-accent/10 bg-transparent',
			success: 'text-success hover:bg-success/10 bg-transparent',
			warning: 'text-warning hover:bg-warning/10 bg-transparent',
			danger: 'text-danger hover:bg-danger/10 bg-transparent',
			info: 'text-info hover:bg-info/10 bg-transparent',
			pink: 'text-pink hover:bg-pink/10 bg-transparent',
			white: 'text-white hover:bg-gray-100 bg-transparent'
		},
		plain: {
			default: 'hover:underline',
			primary: 'hover:underline',
			secondary: 'hover:underline',
			accent: 'hover:underline',
			success: 'hover:underline',
			warning: 'hover:underline',
			danger: 'hover:underline',
			info: 'hover:underline',
			white: 'hover:underline',
			pink: 'hover:underline'
		}
	}

	return backgroundVariantMap[props.variant][props.color]
})

const disabledClasses = computed<string | undefined>(() =>
	props.disabled ? 'opacity-50 transition-all pointer-events-none' : undefined
)

const sizeClasses = computed<string>(() => {
	const sizeMap = {
		sm: { text: 'text-sm', padding: 'px-2 py-1 min-h-8', icon: 'h-8 w-8' },
		md: { text: 'text-base', padding: 'px-4 py-2 min-h-10', icon: 'h-10 w-10' },
		lg: { text: 'text-lg', padding: 'px-6 py-3 min-h-14', icon: 'h-12 w-12' }
	}

	const sizeClass = sizeMap[props.size]

	return props.icon
		? sizeClass.icon
		: `${props.variant !== 'plain' ? sizeClass.padding : undefined} ${sizeClass.text}`
})

const textColorClasses = computed<string | undefined>(() => {
	const textVariantMap: Record<Variant, Record<Color, string>> = {
		default: {
			default: 'text-default',
			primary: 'text-white',
			secondary: 'text-white',
			accent: 'text-white',
			success: 'text-white',
			warning: 'text-default',
			danger: 'text-white',
			info: 'text-white',
			white: 'text-default',
			pink: 'text-white'
		},
		outlined: {
			default: 'text-default',
			primary: 'text-primary',
			secondary: 'text-secondary',
			accent: 'text-accent',
			success: 'text-success',
			warning: 'text-default',
			danger: 'text-danger',
			info: 'text-info',
			white: 'text-default',
			pink: 'text-pink'
		},
		tonal: {
			default: 'text-default',
			primary: 'text-primary',
			secondary: 'text-secondary',
			accent: 'text-accent',
			success: 'text-success',
			warning: 'text-default',
			danger: 'text-danger',
			info: 'text-info',
			white: 'text-default',
			pink: 'text-pink'
		},
		text: {
			default: 'text-default',
			primary: 'text-primary',
			secondary: 'text-secondary',
			accent: 'text-accent',
			success: 'text-success',
			warning: 'text-warning',
			danger: 'text-danger',
			info: 'text-info',
			white: 'text-white',
			pink: 'text-pink'
		},
		plain: {
			default: 'text-default',
			primary: 'text-primary',
			secondary: 'text-secondary',
			accent: 'text-accent',
			success: 'text-success',
			warning: 'text-warning',
			danger: 'text-danger',
			info: 'text-info',
			white: 'text-white',
			pink: 'text-pink'
		}
	}

	if (props.textColor) {
		return textVariantMap[props.variant][props.textColor]
	}

	if (props.color) {
		return textVariantMap[props.variant][props.color]
	}

	return undefined
})

const elementType = computed(() => (props.to ? resolveComponent('NuxtLink') : 'button'))
</script>

<template>
	<component
		:is="elementType"
		:to="props.to || undefined"
		:class="[
			baseClasses,
			backgroundColorClasses,
			borderRadiusClasses,
			disabledClasses,
			sizeClasses,
			textColorClasses
		]"
		:disabled="disabled"
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
