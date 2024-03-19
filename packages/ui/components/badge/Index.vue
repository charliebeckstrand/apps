<script setup lang="ts">
import { useBorderColor } from '@/composables/useBorderColor'
import { useBorderRadius } from '@/composables/useBorderRadius'
import { useTailwindClasses } from '@/composables/useTailwindClasses'
import { useTextColor } from '@/composables/useTextColor'
import { useTextSize } from '@/composables/useTextSize'
import { useVariant } from '@/composables/useVariant'

import type { BorderRadius, Color, Size, Variant } from '@/types/badge'

interface Props {
	color?: Color
	textColor?: Color
	rounded?: BorderRadius
	size?: Size
	variant?: Variant
}

const props = withDefaults(defineProps<Props>(), {
	color: 'default',
	textColor: 'default',
	rounded: 'md',
	size: 'md',
	variant: 'default'
})
</script>

<template>
	<div
		:class="[
			useTailwindClasses([
				useBorderRadius(props.rounded),
				useTextSize(props.size),
				useTextColor(props.textColor),
				useVariant(props.variant, props.color),
				[props.variant !== 'plain', useBorderColor(props.color) || '']
			]),
			'inline-flex items-center space-x-1 border px-1.5 py-0.5'
		]"
	>
		<div v-if="$slots['prepend']">
			<slot name="prepend" />
		</div>

		<div>
			<slot />
		</div>

		<div v-if="$slots['append']">
			<slot name="append" />
		</div>
	</div>
</template>
