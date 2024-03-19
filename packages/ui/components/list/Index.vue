<script setup lang="ts">
import { useTailwindClasses } from '@/composables/useTailwindClasses'
import { useDensity } from '@/composables/list/useDensity'
import { useVariant } from '@/composables/list/useVariant'

import type { Color, Density, Variant } from '@/types/list'

interface Props {
	color?: Color
	variant?: Variant
	density?: Density
	dark: boolean
}

const props = withDefaults(defineProps<Props>(), {
	color: 'default',
	variant: 'default',
	density: 'default',
	dark: false
})
</script>

<template>
	<ul
		:class="[
			useTailwindClasses([useDensity(props.density), useVariant(props.variant, props.color)]),
			{ 'text-white': props.dark },
			'rounded-md'
		]"
	>
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
