<script setup lang="ts">
import { computed } from 'vue'

type Color = 'default' | 'primary' | 'secondary' | 'accent'

interface Props {
	color?: Color
	to?: string
}

const props = withDefaults(defineProps<Props>(), {
	color: 'default',
	to: undefined
})

const baseClasses = computed<string>(() => {
	const classes = 'flex items-center'

	return classes
})

const colorClasses = computed<string | undefined>(() => {
	const colors: Record<Color, string> = {
		default: 'bg-transparent',
		primary: 'text-primary',
		secondary: 'text-secondary',
		accent: 'text-accent'
	} as const

	return props.color ? colors[props.color] : undefined
})

const elementType = computed(() => {
	return props.to ? resolveComponent('NuxtLink') : 'li'
})
</script>

<template>
	<component
		:is="elementType"
		:class="[baseClasses, colorClasses]"
		:to="props.to"
	>
		<div class="prepend mr-1 empty:mr-0">
			<slot name="prepend" />
		</div>

		<div>
			<slot />
		</div>

		<div class="append ml-1 empty:ml-0">
			<slot name="append" />
		</div>
	</component>
</template>

<style scoped lang="scss"></style>
