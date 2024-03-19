<script setup lang="ts">
import { useBorderRadius } from '@/composables/useBorderRadius'
import { useTailwindClasses } from '@/composables/useTailwindClasses'
import { usePadding } from '@/composables/usePadding'
import { useTextColor } from '@/composables/useTextColor'
import { useVariant } from '@/composables/useVariant'

import type { BorderRadius, Color, Padding, Variant } from '@/types/panel'

interface Props {
	color?: Color
	textColor?: Color
	rounded?: BorderRadius
	padding?: Padding
	variant?: Variant
}

const props = withDefaults(defineProps<Props>(), {
	color: 'default',
	textColor: 'default',
	rounded: 'md',
	padding: 'md',
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
