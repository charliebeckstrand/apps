<script setup lang="ts">
import Heading from '@/components/heading/Index.vue'

import { toRefs } from 'vue'

import { useBorderRadius } from '@/composables/useBorderRadius'
import { usePadding } from '@/composables/usePadding'
import { useTailwindClasses } from '@/composables/useTailwindClasses'
import { useTextColor } from '@/composables/useTextColor'
import { useVariant } from '@/composables/useVariant'

import type { BorderRadius, Color, Size, Variant } from '@/types/alert'

interface Props {
	color?: Color
	dismissible?: boolean
	padding?: Size
	rounded?: BorderRadius
	textColor?: Color
	variant?: Variant
}

const props = withDefaults(defineProps<Props>(), {
	color: 'default',
	dismissible: false,
	padding: 'md',
	rounded: 'md',
	textColor: 'default',
	variant: 'default'
})

const { color, padding, rounded, textColor, variant } = toRefs(props)
</script>

<template>
	<div
		:class="
			useTailwindClasses([
				useBorderRadius(rounded),
				usePadding(padding),
				useTextColor(textColor),
				useVariant(variant, color)
			])
		"
	>
		<Heading
			v-if="$slots.title"
			size="lg"
			weight="bold"
		>
			<slot name="title" />
		</Heading>
		<slot />
	</div>
</template>
