<script setup lang="ts">
import { computed } from 'vue'

import type { Color, Density, Variant } from '@/types/list'

interface Props {
	variant?: Variant
	color?: Color
	density?: Density
	dark: boolean
}

const props = withDefaults(defineProps<Props>(), {
	color: 'default',
	variant: 'default',
	density: 'default',
	dark: false
})

const classes = computed<string>(() => {
	const densityMap: Record<Density, string> = {
		default: 'default',
		comfortable: 'comfortable',
		compact: 'compact'
	}

	const variants: Partial<Record<Variant, Partial<Record<Color, string>>>> = {
		default: {
			default: 'text-default',
			primary: 'text-primary',
			secondary: 'text-secondary',
			accent: 'text-accent'
		},
		outlined: {
			default: 'bg-transparent text-default border border-default',
			primary: 'bg-transparent text-primary border border-primary',
			secondary: 'bg-transparent text-secondary border border-secondary',
			accent: 'bg-transparent text-accent border border-accent'
		}
	}

	const classes = ['rounded-md']

	if (props.dark) {
		classes.push('text-white')
	} else {
		classes.push('text-black')
	}

	if (props.density) {
		classes.push(densityMap[props.density])
	}

	if (props.variant) {
		const variant = variants[props.variant]

		if (variant) {
			const color = variant[props.color]

			if (color) {
				classes.push(color)
			}
		}
	}

	return classes.join(' ')
})
</script>

<template>
	<ul :class="classes">
		<slot />
	</ul>
</template>

<style scoped lang="scss">
ul {
	&.default :deep(li) {
		@apply px-4 py-2;
	}

	&.comfortable :deep(li) {
		@apply px-3 py-1.5;
	}

	&.dense :deep(li) {
		@apply px-2 py-1;
	}
}
</style>
