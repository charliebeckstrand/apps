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

const baseClasses = computed<string>(() => `rounded-md ${props.dark ? 'text-white' : 'text-black'}`)

const variantClasses = computed<string | undefined>(() => {
	const variants: Record<Variant, Record<Color, string>> = {
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

	return variants[props.variant][props.color]
})

const densityClasses = computed<string>(() => {
	const densityMap: Record<Density, string> = {
		default: 'default',
		comfortable: 'comfortable',
		dense: 'dense'
	}

	return densityMap[props.density]
})
</script>

<template>
	<ul :class="[baseClasses, variantClasses, densityClasses]">
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
