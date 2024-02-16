<script setup lang="ts">
import Header from '@/components/header/Index.vue'

import { useBorderRadius } from '@/composables/useBorderRadius'
import { usePadding } from '@/composables/usePadding'
import { useTextColor } from '@/composables/useTextColor'

import { computed } from 'vue'

import type { BorderRadius, Color, Padding, Variant } from '@/types/card'

interface Props {
	color?: Color
	textColor?: Color
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
	textColor: 'default',
	variant: 'default',
	rounded: 'md',
	padding: 'md',
	to: undefined,
	href: undefined,
	active: undefined,
	interactive: undefined
})

const classes = computed<string>(() => {
	const variantMap: Record<Variant, Record<Color, { default: string; interactive?: string; active?: string }>> = {
		default: {
			default: {
				default: 'bg-gray-100 text-default',
				interactive: 'hover:bg-gray-200',
				active: 'bg-gray-200 hover:bg-gray-200'
			},
			primary: {
				default: 'bg-primary text-white',
				interactive: 'hover:bg-primary/90',
				active: 'bg-primary/50 hover:bg-primary/50'
			},
			secondary: {
				default: 'bg-secondary text-white',
				interactive: 'hover:bg-secondary/90',
				active: 'bg-secondary/50 hover:bg-secondary/50'
			},
			accent: {
				default: 'bg-accent text-white',
				interactive: 'hover:bg-accent/90',
				active: 'bg-accent/50 hover:bg-accent/50'
			},
			success: {
				default: 'bg-success text-white',
				interactive: 'hover:bg-success/90',
				active: 'bg-success/50 hover:bg-success/50'
			},
			warning: {
				default: 'bg-warning text-default',
				interactive: 'hover:bg-warning/90',
				active: 'bg-warning/50 hover:bg-warning/50'
			},
			danger: {
				default: 'bg-danger text-white',
				interactive: 'hover:bg-danger/90',
				active: 'bg-danger/50 hover:bg-danger/50'
			},
			info: {
				default: 'bg-info text-white',
				interactive: 'hover:bg-info/90',
				active: 'bg-info/50 hover:bg-info/50'
			},
			white: {
				default: 'bg-white text-default',
				interactive: 'hover:bg-gray-100',
				active: 'bg-white'
			}
		},
		outlined: {
			default: {
				default: 'bg-transparent border border-default text-default',
				interactive: 'hover:bg-gray-200',
				active: 'bg-gray-200'
			},
			primary: {
				default: 'bg-transparent border border-primary text-primary',
				interactive: 'hover:bg-primary/10',
				active: 'bg-primary/10'
			},
			secondary: {
				default: 'bg-transparent border border-secondary text-secondary',
				interactive: 'hover:bg-secondary/10',
				active: 'bg-secondary/10'
			},
			accent: {
				default: 'bg-transparent border border-accent text-accent',
				interactive: 'hover:bg-accent/10',
				active: 'bg-accent/10'
			},
			success: {
				default: 'bg-transparent border border-success text-success',
				interactive: 'hover:bg-success/10',
				active: 'bg-success/10'
			},
			warning: {
				default: 'bg-transparent border border-warning text-default',
				interactive: 'hover:bg-warning/10',
				active: 'bg-warning/10'
			},
			danger: {
				default: 'bg-transparent border border-danger text-danger',
				interactive: 'hover:bg-danger/10',
				active: 'bg-danger/10'
			},
			info: {
				default: 'bg-transparent border border-info text-info',
				interactive: 'hover:bg-info/10',
				active: 'bg-info/10'
			},
			white: {
				default: 'bg-white border border-white text-default',
				interactive: 'hover:bg-white',
				active: 'bg-white'
			}
		},
		tonal: {
			default: {
				default: 'bg-gray-50 text-default',
				interactive: 'hover:bg-gray-200',
				active: 'bg-gray-200 hover:bg-gray-200'
			},
			primary: {
				default: 'bg-primary/10 text-primary',
				interactive: 'hover:bg-primary/20',
				active: 'bg-primary/50 hover:bg-primary/50'
			},
			secondary: {
				default: 'bg-secondary/10 text-secondary',
				interactive: 'hover:bg-secondary/20',
				active: 'bg-secondary/50 hover:bg-secondary/50'
			},
			accent: {
				default: 'bg-accent/10 text-accent',
				interactive: 'hover:bg-accent/20',
				active: 'bg-accent/50 hover:bg-accent/50'
			},
			success: {
				default: 'bg-success/10 text-success',
				interactive: 'hover:bg-success/20',
				active: 'bg-success/50 hover:bg-success/50'
			},
			warning: {
				default: 'bg-warning/10 text-default',
				interactive: 'hover:bg-warning/20',
				active: 'bg-warning/50 hover:bg-warning/50'
			},
			danger: {
				default: 'bg-danger/10 text-danger',
				interactive: 'hover:bg-danger/20',
				active: 'bg-danger/50 hover:bg-danger/50'
			},
			info: {
				default: 'bg-info/10 text-info',
				interactive: 'hover:bg-info/20',
				active: 'bg-info/50 hover:bg-info/50'
			},
			white: {
				default: 'bg-white text-default',
				interactive: 'hover:bg-gray-200',
				active: 'bg-gray-500 hover:bg-gray-500'
			}
		},
		plain: {
			default: {
				default: 'transparent text-default',
				interactive: 'hover:bg-gray-200',
				active: 'bg-gray-200 hover:bg-gray-200'
			},
			primary: {
				default: 'transparent text-primary',
				interactive: 'hover:bg-primary/10',
				active: 'bg-primary/20 hover:bg-primary/20'
			},
			secondary: {
				default: 'transparent text-secondary',
				interactive: 'hover:bg-secondary/10',
				active: 'bg-secondary/10 hover:bg-secondary/10'
			},
			accent: {
				default: 'transparent text-accent',
				interactive: 'hover:bg-accent/10',
				active: 'bg-accent/20 hover:bg-accent/20'
			},
			success: {
				default: 'transparent text-success',
				interactive: 'hover:bg-success/10',
				active: 'bg-success/10 hover:bg-success/10'
			},
			warning: {
				default: 'transparent text-default',
				interactive: 'hover:bg-warning/10',
				active: 'bg-warning/10 hover:bg-warning/10'
			},
			danger: {
				default: 'transparent text-danger',
				interactive: 'hover:bg-danger/10',
				active: 'bg-danger/10 hover:bg-danger/10'
			},
			info: {
				default: 'transparent text-info',
				interactive: 'hover:bg-info/10',
				active: 'bg-info/10 hover:bg-info/10'
			},
			white: {
				default: 'transparent text-default',
				interactive: 'hover:bg-gray-200',
				active: 'bg-gray-200 hover:bg-gray-200'
			}
		}
	}

	const classes = []

	if (props.active) {
		const variant = variantMap[props.variant]

		if (variant) {
			const color = variant[props.color]?.active

			if (color) {
				classes.push(color)
			}
		}
	}

	if (props.interactive) {
		const variant = variantMap[props.variant]

		if (variant) {
			const color = variant[props.color]?.interactive

			if (color) {
				classes.push(color)
			}
		}

		classes.push('cursor-pointer')
	}

	if (props.rounded) {
		classes.push(useBorderRadius(props.rounded))
	}

	if (props.textColor) {
		classes.push(useTextColor(props.textColor))
	}

	if (props.to) {
		classes.push('block')
	}

	if (props.variant) {
		const variant = variantMap[props.variant]

		if (variant) {
			const color = variant[props.color]?.default

			classes.push(color)
		}
	}

	return classes.join(' ')
})

const paddingClasses = computed<string>(() => {
	const classes = []

	if (props.padding) {
		classes.push(usePadding(props.padding))
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
		<Header
			v-if="$slots['title'] || $slots['subtitle'] || $slots['header-append']"
			:class="paddingClasses"
		>
			<template #title>
				<slot name="title" />
			</template>
			<template #subtitle>
				<slot name="subtitle" />
			</template>
			<template #append>
				<slot name="header-append" />
			</template>
		</Header>
		<div
			v-if="$slots['prepend'] || $slots['default'] || $slots['append']"
			:class="paddingClasses"
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
		</div>
	</component>
</template>

<style scoped lang="scss"></style>
