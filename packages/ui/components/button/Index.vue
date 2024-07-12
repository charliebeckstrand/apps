<script setup lang="ts">
import { computed, toRefs } from 'vue'

import { useBackgroundVariant } from '@/composables/button/useBackgroundVariant'
import { useBorderRadius } from '@/composables/useBorderRadius'
import { useSize } from '@/composables/button/useSize'
import { useTailwindClasses } from '@/composables/useTailwindClasses'
import { useTextVariant } from '@/composables/button/useTextVariant'

import type { BorderRadius, Color, Size, Variant } from '@/types/button'

interface Props {
	block?: boolean
	color?: Color
	dark?: boolean
	disabled?: boolean
	icon?: boolean
	rounded?: BorderRadius
	size?: Size
	textColor?: Color
	to?: string
	variant?: Variant
}

const props = withDefaults(defineProps<Props>(), {
	block: false,
	color: 'default',
	dark: false,
	disabled: false,
	icon: false,
	rounded: 'md',
	size: 'md',
	textColor: undefined,
	to: undefined,
	variant: 'default'
})

const { block, color, dark, disabled, icon, rounded, size, textColor, to, variant } = toRefs(props)

const elementType = computed(() => (to.value ? resolveComponent('NuxtLink') : 'button'))
</script>

<template>
	<component
		:is="elementType"
		:class="[
			'flex cursor-pointer select-none items-center justify-center space-x-1 focus:outline-offset-2',
			[
				block && 'w-full',
				dark && 'text-white hover:bg-opacity-10',
				disabled && 'pointer-events-none opacity-50',
				icon && 'rounded-full'
			],
			useTailwindClasses([
				useBackgroundVariant(variant, color),
				[!icon, useBorderRadius(rounded)],
				[!icon, useSize(size).padding],
				[!icon, useSize(size).text],
				[icon, useSize(size).icon],
				useTextVariant(variant, textColor ?? color)
			])
		]"
		:disabled="disabled"
		:to="to || undefined"
	>
		<div v-if="$slots.prepend">
			<slot name="prepend" />
		</div>

		<div>
			<slot />
		</div>

		<div v-if="$slots.append">
			<slot name="append" />
		</div>
	</component>
</template>
