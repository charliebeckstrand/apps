<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'default' | 'outlined' | 'tonal' | 'plain'
type Color = 'primary' | 'secondary' | 'accent'

interface Props {
	variant?: Variant
	color?: Color
	rounded?: boolean
	to?: string
	href?: string
	interactive?: boolean
	active?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	variant: 'default',
	color: undefined,
	rounded: true,
	to: undefined,
	href: undefined,
	interactive: false,
	active: false
})

const interactive = props.to || props.href || props.interactive

const baseClasses = computed<string>(() => {
	const classes = `p-3 ${props.to ? 'block' : null}`

	return classes
})

const conditionalClasses = computed<string>(() => (props.rounded ? 'rounded-md' : 'rounded-none'))

const variantClasses = computed<string | undefined>(() => {
	const variants: Record<Variant, Record<Color, string>> = {
		default: {
			primary: 'bg-primary text-white',
			secondary: 'bg-secondary text-white',
			accent: 'bg-accent text-white'
		},
		outlined: {
			primary: 'bg-transparent text-primary border border-primary',
			secondary: 'bg-transparent text-secondary border border-secondary',
			accent: 'bg-transparent text-accent border border-accent'
		},
		tonal: {
			primary: `bg-primary/10 ${props.active ? 'bg-primary/20' : null} text-primary ${
				interactive ? 'hover:bg-primary/20' : null
			}`,
			secondary: `bg-secondary/10 ${props.active ? 'bg-secondary/20' : null} text-secondary ${
				interactive ? 'hover:bg-secondary/20' : null
			}`,
			accent: `bg-accent/10 ${props.active ? 'bg-accent/20' : null} text-accent ${
				interactive ? 'hover:bg-accent/20' : null
			}`
		},
		plain: {
			primary: `${props.active ? 'bg-primary/20' : 'bg-transparent'} text-primary ${
				interactive ? 'hover:bg-primary/20' : null
			}`,
			secondary: `${props.active ? 'bg-secondary/20' : 'bg-transparent'} text-secondary ${
				interactive ? 'hover:bg-secondary/20' : null
			}`,
			accent: `${props.active ? 'bg-accent/20' : 'bg-transparent'} text-accent ${
				interactive ? 'hover:bg-accent/20' : null
			}`
		}
	} as const

	return props.color ? variants[props.variant][props.color] : undefined
})

const elementType = computed(() => {
	return props.to ? resolveComponent('NuxtLink') : 'div'
})
</script>

<template>
	<component
		:is="elementType"
		:to="props.to"
		:class="[baseClasses, conditionalClasses, variantClasses]"
	>
		<UIHeader :class="{ 'mb-3': $slots['title'] || $slots['subtitle'] }">
			<template #title>
				<slot name="title" />
			</template>
			<template #subtitle>
				<slot name="subtitle" />
			</template>
		</UIHeader>

		<div class="space-y-3">
			<slot />
		</div>

		<div class="mt-3 empty:mt-0">
			<slot name="append" />
		</div>
	</component>
</template>
