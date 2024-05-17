<script setup lang="ts">
import { toRefs } from 'vue'

import { useBorderRadius } from '@/composables/useBorderRadius'
import { usePadding } from '@/composables/usePadding'
import { useTailwindClasses } from '@/composables/useTailwindClasses'
import { useTextColor } from '@/composables/useTextColor'
import { useVariant } from '@/composables/useVariant'

import type { BorderRadius, Color, Padding, Variant } from '@/types/panel'

interface Props {
	color?: Color
	padding?: Padding
	rounded?: BorderRadius
	textColor?: Color
	variant?: Variant
}

const props = withDefaults(defineProps<Props>(), {
	color: 'default',
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
		<slot />
	</div>
</template>
