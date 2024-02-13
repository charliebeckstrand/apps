<script setup lang="ts">
import { computed } from 'vue'

import type { Color, Variant } from '@/types/navbar'

interface Props {
	color?: Color
	variant?: Variant
}

const props = withDefaults(defineProps<Props>(), {
	color: 'primary',
	variant: 'default'
})

const classes = computed<string>(() => {
	const variantMap: Record<Variant, Record<Color, string>> = {
		default: {
			primary: 'bg-primary text-white',
			secondary: 'bg-secondary text-white',
			transparent: 'bg-transparent text-primary',
			dark: 'bg-[#333] text-white'
		}
	}

	const classes = ['flex items-center p-4 leading-tight']

	if (props.variant) {
		const variant = variantMap[props.variant]

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
	<nav :class="classes">
		<div class="mr-auto">
			<slot name="left" />
		</div>

		<slot />

		<div class="ml-auto space-x-4">
			<slot name="right" />
		</div>
	</nav>
</template>
