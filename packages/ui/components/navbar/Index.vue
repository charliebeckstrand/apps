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
</script>

<template>
	<nav :class="[useTailwindClasses([useVariant(props.variant, props.color)]), 'flex items-center p-4 leading-tight']">
		<div class="mr-auto">
			<slot name="left" />
		</div>

		<slot />

		<div class="ml-auto space-x-4">
			<slot name="right" />
		</div>
	</nav>
</template>
