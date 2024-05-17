<script setup lang="ts">
import { computed } from 'vue'

import { useBackgroundVariant } from '@/composables/button/useBackgroundVariant'
import { useBorderRadius } from '@/composables/useBorderRadius'
import { useJustify } from '@/composables/useJustify'
import { useSize } from '@/composables/button/useSize'
import { useTailwindClasses } from '@/composables/useTailwindClasses'
import { useTextVariant } from '@/composables/button/useTextVariant'

import type { BorderRadius, Color, Justify, Size, Variant } from '@/types/button'

interface Props {
	block?: boolean
	color?: Color
	dark?: boolean
	disabled?: boolean
	icon?: boolean
	justify?: Justify
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
	justify: 'center',
	rounded: 'md',
	size: 'md',
	textColor: 'default',
	to: undefined,
	variant: 'default'
})

const { block, color, dark, disabled, icon, justify, rounded, size, textColor, to, variant } = toRefs(props)

const elementType = computed(() => (to.value ? resolveComponent('NuxtLink') : 'button'))
</script>

<template>
	<component
		:is="elementType"
		:class="[
			'flex cursor-pointer items-center space-x-1 focus:outline-offset-2',
			[
				block && 'w-full',
				dark && 'text-white hover:bg-opacity-10',
				disabled && 'pointer-events-none opacity-50',
				icon && 'justify-center rounded-full'
			],
			useTailwindClasses([
				useBackgroundVariant(variant, color),
				[!icon, useBorderRadius(rounded)],
				[block && justify !== undefined, useJustify(justify)],
				[icon, useSize(size).icon],
				[!icon, useSize(size).padding],
				[!icon, useSize(size).text],
				[textColor !== undefined, useTextVariant(variant, color)]
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
