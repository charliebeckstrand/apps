<script setup lang="ts">
import { useTailwindClasses } from '@/composables/useTailwindClasses'
import { usePadding } from '@/composables/usePadding'
import { useVariant } from '@/composables/useVariant'

import Heading from '@/components/heading/Index.vue'

import type { Color, Size, Variant } from '@/types/alert'

interface Props {
	color?: Color
	dark?: boolean
	padding?: Size
	variant?: Variant
}

const props = withDefaults(defineProps<Props>(), {
	color: 'default',
	dark: false,
	padding: 'md',
	variant: 'default'
})
</script>

<template>
	<div
		:class="[
			useTailwindClasses([usePadding(props.padding), useVariant(props.variant, props.color)]),
			'rounded-md',
			{ 'text-white': props.dark }
		]"
	>
		<Heading
			v-if="$slots['title']"
			size="lg"
			weight="bold"
		>
			<slot name="title" />
		</Heading>
		<slot />
	</div>
</template>
