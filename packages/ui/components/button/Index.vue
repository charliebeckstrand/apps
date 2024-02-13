<script setup lang="ts">
import { computed } from 'vue'

import type { BorderRadius, Color, Justify, Size, Variant } from '@/types/button'

interface Props {
	variant?: Variant
	color?: Color
	textColor?: Color
	size?: Size
	icon?: boolean
	to?: string
	dark?: boolean
	block?: boolean
	justify?: Justify
	rounded?: BorderRadius
	disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	variant: 'default',
	color: 'default',
	textColor: 'default',
	size: 'md',
	icon: false,
	to: undefined,
	dark: false,
	block: false,
	justify: undefined,
	rounded: 'md',
	disabled: false
})

const classes = computed<string>(() => {
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

	const borderRadiusMap: Record<BorderRadius, string | undefined> = {
		sm: 'rounded-sm',
		md: 'rounded-md',
		lg: 'rounded-lg',
		full: 'rounded-full',
		none: 'rounded-none'
	}

	const justifyMap: Record<Justify, string> = {
		start: 'justify-start',
		center: 'justify-center',
		end: 'justify-end',
		'space-around': 'justify-around',
		'space-between': 'justify-between',
		'space-evenly': 'justify-evenly'
	}

	const sizeMap = {
		sm: { text: 'text-sm', padding: 'px-2 py-1 min-h-8', icon: 'h-8 w-8' },
		md: { text: 'text-base', padding: 'px-4 py-2 min-h-10', icon: 'h-10 w-10' },
		lg: { text: 'text-lg', padding: 'px-6 py-3 min-h-14', icon: 'h-12 w-12' }
	}

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

	const classes = ['flex items-center space-x-1 focus:outline-offset-2']

	if (props.block) {
		classes.push('w-full')

		if (props.justify) {
			classes.push(justifyMap[props.justify])
		} else {
			classes.push('justify-center')
		}
	}

	if (props.variant) {
		const backgroundVariant = backgroundVariantMap[props.variant]
		const textVariant = textVariantMap[props.variant]

		if (backgroundVariant && props.color) {
			const background = backgroundVariant[props.color]

			if (background) {
				classes.push(background)
			}
		}

		if (textVariant && props.textColor) {
			const text = textVariant[props.color]

			if (text) {
				classes.push(text)
			}
		}
	}

	if (props.dark) {
		classes.push('text-white')
	}

	if (props.disabled) {
		classes.push('opacity-50 transition-all pointer-events-none')
	}

	if (props.icon) {
		classes.push(`rounded-full justify-center ${sizeMap[props.size].icon}`)

		if (props.dark) {
			classes.push('hover:bg-gray-100/10')
		} else {
			classes.push('hover:bg-gray-100')
		}
	} else {
		classes.push(
			`${props.variant !== 'plain' ? sizeMap[props.size].padding : undefined} ${sizeMap[props.size].text} ${
				borderRadiusMap[props.rounded]
			}`
		)
	}

	if (props.textColor) {
		classes.push(textVariantMap[props.variant][props.textColor])
	}

	return classes.join(' ')
})

const elementType = computed(() => (props.to ? resolveComponent('NuxtLink') : 'button'))
</script>

<template>
	<component
		:is="elementType"
		:class="classes"
		:disabled="disabled"
		:to="props.to || undefined"
	>
		<div v-if="$slots['prepend']">
			<slot name="prepend" />
		</div>

		<div>
			<slot />
		</div>

		<div v-if="$slots['append']">
			<slot name="append" />
		</div>
	</component>
</template>
