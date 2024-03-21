<script setup lang="ts">
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
</script>

<template>
	<div
		:class="
			useTailwindClasses([
				useBorderRadius(props.rounded),
				usePadding(props.padding),
				useTextColor(props.textColor),
				useVariant(props.variant, props.color)
			])
		"
	>
		<slot />
	</div>
</template>
