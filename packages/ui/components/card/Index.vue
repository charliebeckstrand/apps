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

const classes = computed<string>(() => {
	const borderRadiusMap: Record<BorderRadius, string> = {
		sm: 'rounded-sm',
		md: 'rounded-md',
		lg: 'rounded-lg',
		full: 'rounded-full',
		none: 'rounded-none'
	}

	const variantMap: Record<Variant, Record<Color, string>> = {
		default: {
			default: 'bg-gray-100 text-base',
			primary: 'bg-primary text-white',
			secondary: 'bg-secondary text-white',
			accent: 'bg-accent text-white',
			white: 'bg-white text-base'
		},
		outlined: {
			default: 'bg-transparent border border-gray-300 text-base',
			primary: 'bg-transparent border border-primar text-primaryy',
			secondary: 'bg-transparent border border-secondary text-secondary',
			accent: 'bg-transparent border border-accent text-accent',
			white: 'bg-transparent border border-white text-white'
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
			}`,
			white: 'bg-white text-base'
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
			}`,
			white: 'text-white'
		}
	}

	const classes = ['ui-card interactive cursor-pointer']

	if (props.rounded) {
		classes.push(borderRadiusMap[props.rounded])
	}

	if (props.interactive) {
		classes.push('interactive cursor-pointer')
	}

	if (props.to) {
		classes.push('block')
	}

	if (props.variant) {
		const variant = variantMap[props.variant]

		if (variant) {
			const color = variant[props.color]

			classes.push(color)
		}
	}

	return classes.join(' ')
})

const elementType = computed(() => (props.to ? resolveComponent('NuxtLink') : 'div'))
</script>

<template>
	<component
		:is="elementType"
		:to="props.to"
		:class="classes"
	>
		<UIPanel
			v-if="$slots['title'] || $slots['subtitle'] || $slots['header-append']"
			:color="props.color"
			:padding="props.padding"
			class="flex items-center justify-between space-x-4"
		>
			<UIHeader>
				<template #title>
					<slot name="title" />
				</template>
				<template #subtitle>
					<slot name="subtitle" />
				</template>
			</UIHeader>
			<slot name="header-append" />
		</UIPanel>
		<UIPanel
			v-if="$slots['prepend'] || $slots['default'] || $slots['append']"
			:color="props.color"
			:padding="props.padding"
			class="space-y-2"
		>
			<div v-if="$slots['append']">
				<slot name="prepend" />
			</div>

			<div v-if="$slots['default'] || $slots['body']">
				<slot />
				<slot name="body" />
			</div>

			<div v-if="$slots['append']">
				<slot name="append" />
			</div>
		</UIPanel>
	</component>
</template>

<style scoped lang="scss"></style>
