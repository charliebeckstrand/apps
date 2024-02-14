<script setup lang="ts">
import { computed } from 'vue'

import { borderRadiusMap } from '@/constants/mapping'

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
	interactive: undefined
})

const classes = computed<string>(() => {
	const variantMap: Record<Variant, Record<Color, { default: string; hover?: string; active?: string }>> = {
		default: {
			default: {
				default: 'bg-gray-100 text-white',
				hover: 'hover:bg-gray-200',
				active: 'bg-gray-200'
			},
			primary: {
				default: 'bg-primary text-white',
				hover: 'hover:bg-primary/10',
				active: 'bg-primary/10'
			},
			secondary: {
				default: 'bg-secondary text-white',
				hover: 'hover:bg-secondary/10',
				active: 'bg-secondary/10'
			},
			accent: {
				default: 'bg-accent text-white',
				hover: 'hover:bg-accent/10',
				active: 'bg-accent/10'
			},
			success: {
				default: 'bg-success text-white',
				hover: 'hover:bg-success/10',
				active: 'bg-success/10'
			},
			warning: {
				default: 'bg-warning text-default',
				hover: 'hover:bg-warning/10',
				active: 'bg-warning/10'
			},
			danger: {
				default: 'bg-danger text-white',
				hover: 'hover:bg-danger/10',
				active: 'bg-danger/10'
			},
			info: {
				default: 'bg-info text-white',
				hover: 'hover:bg-info/10',
				active: 'bg-info/10'
			},
			white: {
				default: 'bg-white text-default',
				hover: 'hover:bg-white',
				active: 'bg-white'
			}
		},
		outlined: {
			default: {
				default: 'bg-transparent border border-default text-default',
				hover: 'hover:bg-gray-200',
				active: 'bg-gray-200'
			},
			primary: {
				default: 'bg-transparent border border-primary text-primary',
				hover: 'hover:bg-primary/10',
				active: 'bg-primary/10'
			},
			secondary: {
				default: 'bg-transparent border border-secondary text-secondary',
				hover: 'hover:bg-secondary/10',
				active: 'bg-secondary/10'
			},
			accent: {
				default: 'bg-transparent border border-accent text-accent',
				hover: 'hover:bg-accent/10',
				active: 'bg-accent/10'
			},
			success: {
				default: 'bg-transparent border border-success text-success',
				hover: 'hover:bg-success/10',
				active: 'bg-success/10'
			},
			warning: {
				default: 'bg-transparent border border-warning text-default',
				hover: 'hover:bg-warning/10',
				active: 'bg-warning/10'
			},
			danger: {
				default: 'bg-transparent border border-danger text-danger',
				hover: 'hover:bg-danger/10',
				active: 'bg-danger/10'
			},
			info: {
				default: 'bg-transparent border border-info text-info',
				hover: 'hover:bg-info/10',
				active: 'bg-info/10'
			},
			white: {
				default: 'bg-transparent border border-white text-default',
				hover: 'hover:bg-white',
				active: 'bg-white'
			}
		},
		tonal: {
			default: {
				default: 'bg-gray-50 text-default',
				hover: 'hover:bg-gray-200',
				active: 'bg-gray-200'
			},
			primary: {
				default: 'bg-primary/10 text-primary',
				hover: 'hover:bg-primary/20',
				active: 'bg-primary/20'
			},
			secondary: {
				default: 'bg-secondary/10 text-secondary',
				hover: 'hover:bg-secondary/20',
				active: 'bg-secondary/20'
			},
			accent: {
				default: 'bg-accent/10 text-accent',
				hover: 'hover:bg-accent/20',
				active: 'bg-accent/20'
			},
			success: {
				default: 'bg-success/10 text-success',
				hover: 'hover:bg-success/20',
				active: 'bg-success/20'
			},
			warning: {
				default: 'bg-warning/10 text-default',
				hover: 'hover:bg-warning/20',
				active: 'bg-warning/20'
			},
			danger: {
				default: 'bg-danger/10 text-danger',
				hover: 'hover:bg-danger/20',
				active: 'bg-danger/20'
			},
			info: {
				default: 'bg-info/10 text-info',
				hover: 'hover:bg-info/20',
				active: 'bg-info/20'
			},
			white: {
				default: 'bg-white text-default',
				hover: 'hover:bg-gray-200',
				active: 'bg-gray-200'
			}
		},
		plain: {
			default: {
				default: 'transparent text-default',
				hover: 'hover:bg-gray-200',
				active: 'bg-gray-200'
			},
			primary: {
				default: 'transparent text-primary',
				hover: 'hover:bg-primary/10',
				active: 'bg-primary/10'
			},
			secondary: {
				default: 'transparent text-secondary',
				hover: 'hover:bg-secondary/10',
				active: 'bg-secondary/10'
			},
			accent: {
				default: 'transparent text-accent',
				hover: 'hover:bg-accent/10',
				active: 'bg-accent/10'
			},
			success: {
				default: 'transparent text-success',
				hover: 'hover:bg-success/10',
				active: 'bg-success/10'
			},
			warning: {
				default: 'transparent text-default',
				hover: 'hover:bg-warning/10',
				active: 'bg-warning/10'
			},
			danger: {
				default: 'transparent text-danger',
				hover: 'hover:bg-danger/10',
				active: 'bg-danger/10'
			},
			info: {
				default: 'transparent text-info',
				hover: 'hover:bg-info/10',
				active: 'bg-info/10'
			},
			white: {
				default: 'transparent text-default',
				hover: 'hover:bg-gray-200',
				active: 'bg-gray-200'
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
			const color = variant[props.color]?.hover

			if (color) {
				classes.push(color)
			}
		}

		classes.push('cursor-pointer')
	}

	if (props.rounded) {
		classes.push(borderRadiusMap[props.rounded])
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
			class="flex items-center justify-between space-x-4"
			:color="props.color"
			:padding="props.padding"
			:variant="props.variant"
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
			class="space-y-2"
			:color="props.color"
			:padding="props.padding"
			:variant="props.variant"
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
