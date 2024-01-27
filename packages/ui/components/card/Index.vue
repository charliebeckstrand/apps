<script setup lang="ts">
import { computed } from 'vue'

import type { BorderRadius, Color, Padding, Variant } from '@/types/card'

interface Props {
	color?: Color
	variant?: Variant
	rounded?: BorderRadius
	padding?: Padding
	to?: string
	href?: string
	active?: boolean
	interactive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	color: 'default',
	variant: 'default',
	rounded: 'md',
	padding: 'md',
	to: undefined,
	href: undefined,
	active: undefined,
	interactive: false
})

const interactive = props.to || props.href || props.interactive

const baseClasses = computed<string>(
	() => `${props.interactive ? 'interactive cursor-pointer' : undefined} ${props.to ? 'block' : undefined}`
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
			primary: `bg-primary/10 text-primary ${props.active ? 'bg-primary/10' : undefined} ${
				interactive ? 'hover:bg-primary/10' : undefined
			}`,
			secondary: `bg-secondary/10 text-secondary ${props.active ? 'bg-secondary/10' : undefined} ${
				interactive ? 'hover:bg-secondary/10' : undefined
			}`,
			accent: `bg-accent/10 text-accent ${props.active ? 'bg-accent/10' : undefined} ${
				interactive ? 'hover:bg-accent/10' : undefined
			}`
		},
		plain: {
			default: `text-base ${props.active ? 'bg-gray-100' : 'bg-transparent'} ${
				interactive ? 'hover:bg-gray-100' : undefined
			}`,
			primary: `text-primary ${props.active ? 'bg-primary/10' : 'bg-transparent'} ${
				interactive ? 'hover:bg-primary/10' : undefined
			}`,
			secondary: `text-secondary ${props.active ? 'bg-secondary/10' : 'bg-transparent'} ${
				interactive ? 'hover:bg-secondary/10' : undefined
			}`,
			accent: `text-accent ${props.active ? 'bg-accent/10' : 'bg-transparent'} ${
				interactive ? 'hover:bg-accent/10' : undefined
			}`
		}
	}

	return props.color ? variantMap[props.variant][props.color] : undefined
})

const paddingClasses = computed<string>(() => {
	const paddingMap: Record<Padding, string> = {
		sm: 'p-3',
		md: 'p-4',
		lg: 'p-5',
		none: 'p-0'
	}

	return paddingMap[props.padding]
})

const elementType = computed(() => (props.to ? resolveComponent('NuxtLink') : 'div'))
</script>

<template>
	<component
		:is="elementType"
		:to="props.to"
		:class="[baseClasses, borderRadiusClasses, colorClasses, paddingClasses]"
	>
		<UIHeader :class="{ 'mb-2': $slots['title'] || $slots['subtitle'] }">
			<template #title>
				<slot name="title" />
			</template>
			<template #subtitle>
				<slot name="subtitle" />
			</template>
		</UIHeader>

		<div class="mb-2 empty:mb-0">
			<slot name="prepend" />
		</div>

		<div>
			<slot />
		</div>

		<div class="mt-2 empty:mt-0">
			<slot name="append" />
		</div>
	</component>
</template>
