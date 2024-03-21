<script setup lang="ts">
import { useTailwindClasses } from '@/composables/useTailwindClasses'
import { useBorderRadius } from '@/composables/useBorderRadius'
import { usePadding } from '@/composables/usePadding'
import { useVariant } from '@/composables/useVariant'

import Heading from '@/components/heading/Index.vue'

import type { BorderRadius, Color, Size, Variant } from '@/types/alert'

interface Props {
	color?: Color
	dark?: boolean
	padding?: Size
	rounded?: BorderRadius
	variant?: Variant
}

const props = withDefaults(defineProps<Props>(), {
	color: 'default',
	dark: false,
	padding: 'md',
	rounded: 'md',
	variant: 'default'
})
</script>

<template>
	<div
		:class="[
			useTailwindClasses([
				useBorderRadius(props.rounded),
				usePadding(props.padding),
				useVariant(props.variant, props.color)
			]),
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
