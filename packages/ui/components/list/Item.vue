<script setup lang="ts">
import { computed } from 'vue'

import type { Color } from '@/types/list'

interface Props {
	color?: Color
	to?: string
}

const props = withDefaults(defineProps<Props>(), {
	color: 'default',
	to: undefined
})

const classes = computed<string>(() => {
	const colorMap: Partial<Record<Color, string>> = {
		default: 'bg-transparent',
		primary: 'text-primary',
		secondary: 'text-secondary',
		accent: 'text-accent'
	}

	const classes = ['flex items-center']

	if (props.color) {
		const color = colorMap[props.color]

		if (color) {
			classes.push(color)
		}
	}

	return classes.join(' ')
})

const elementType = computed(() => (props.to ? resolveComponent('NuxtLink') : 'li'))
</script>

<template>
	<component
		:is="elementType"
		:class="classes"
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
