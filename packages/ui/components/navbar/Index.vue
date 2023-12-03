<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'default'
type Color = 'primary' | 'secondary' | 'transparent'

interface Props {
	variant?: Variant
	color?: Color
}

const props = withDefaults(defineProps<Props>(), {
	variant: 'default',
	color: 'primary'
})

const baseClasses = computed<string>(() => {
	const classes = 'flex items-center p-5 leading-tight'

	return classes
})

const variantClasses = computed<string | undefined>(() => {
	const variants: Record<Variant, Record<Color, string>> = {
		default: {
			primary: 'bg-primary text-white',
			secondary: 'bg-secondary text-white',
			transparent: 'bg-transparent text-primary'
		}
	} as const

	return props.color ? variants[props.variant][props.color] : undefined
})
</script>

<template>
	<nav :class="[baseClasses, variantClasses]">
		<div>
			<slot name="left" />
		</div>

		<div class="ml-auto space-x-3">
			<slot name="right" />
		</div>
	</nav>
</template>

<style scoped lang="scss"></style>
