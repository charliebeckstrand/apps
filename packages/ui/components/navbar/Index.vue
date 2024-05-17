<script setup lang="ts">
import { useTailwindClasses } from '@/composables/useTailwindClasses'
import { useVariant } from '@/composables/navbar/useVariant'

import type { Color, Variant } from '@/types/navbar'

interface Props {
	color?: Color
	variant?: Variant
}

const props = withDefaults(defineProps<Props>(), {
	color: 'primary',
	variant: 'default'
})

const { color, variant } = toRefs(props)
</script>

<template>
	<nav :class="['flex items-center p-4 leading-tight', useTailwindClasses([useVariant(variant, color)])]">
		<div
			v-if="$slots.left"
			class="mr-auto"
		>
			<slot name="left" />
		</div>

		<slot />

		<div
			v-if="$slots.right"
			class="ml-auto space-x-4"
		>
			<slot name="right" />
		</div>
	</nav>
</template>
