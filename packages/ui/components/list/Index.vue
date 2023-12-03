<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'default' | 'outlined'
type Color = 'primary' | 'secondary' | 'accent'
type Density = 'default' | 'comfortable' | 'dense'

interface Props {
	variant?: Variant
	color?: Color
	density?: Density
	dark: boolean
}

const props = withDefaults(defineProps<Props>(), {
	variant: 'default',
	density: 'default',
	dark: false
})

const baseClasses = computed<string>(() => {
	const classes = 'rounded-md'

	const darkClasses = props.dark ? 'text-white' : 'text-black'

	return `${classes} ${darkClasses}`
})

const variantClasses = computed<string | undefined>(() => {
	const variants: Record<Variant, Record<Color, string>> = {
		default: {
			primary: 'text-primary',
			secondary: 'text-secondary',
			accent: 'text-accent'
		},
		outlined: {
			primary: 'bg-transparent text-primary border border-primary',
			secondary: 'bg-transparent text-secondary border border-secondary',
			accent: 'bg-transparent text-accent border border-accent'
		}
	} as const

	return props.color ? variants[props.variant][props.color] : undefined
})

const densityClasses = computed<string>(() => {
	const densities: Record<Density, string> = {
		default: 'default',
		comfortable: 'comfortable',
		dense: 'dense'
	} as const

	return densities[props.density]
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
