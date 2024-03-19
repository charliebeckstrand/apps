<script setup lang="ts">
import { computed } from 'vue'

import { useBackgroundVariant } from '@/composables/button/useBackgroundVariant'
import { useBorderRadius } from '@/composables/useBorderRadius'
import { useTailwindClasses } from '@/composables/useTailwindClasses'
import { useJustify } from '@/composables/useJustify'
import { useSize } from '@/composables/button/useSize'
import { useTextVariant } from '@/composables/button/useTextVariant'

import type { BorderRadius, Color, Justify, Size, Variant } from '@/types/button'

interface Props {
	variant?: Variant
	color?: Color
	textColor?: Color
	size?: Size
	icon?: boolean
	to?: string
	dark?: boolean
	block?: boolean
	justify?: Justify
	rounded?: BorderRadius
	disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	variant: 'default',
	color: 'default',
	textColor: 'default',
	size: 'md',
	icon: false,
	to: undefined,
	dark: false,
	block: false,
	justify: 'center',
	rounded: 'md',
	disabled: false
})

const elementType = computed(() => (props.to ? resolveComponent('NuxtLink') : 'button'))
</script>

<template>
	<component
		:is="elementType"
		:class="[
			useTailwindClasses([
				useBackgroundVariant(props.variant, props.color),
				[props.block && props.justify !== undefined, useJustify(props.justify)],
				[props.icon, useSize(props.size).icon],
				[
					!props.icon,
					`${props.variant !== 'plain' ? useSize(props.size).padding : undefined} ${
						useSize(props.size).text
					} ${useBorderRadius(props.rounded)}`
				],
				[props.textColor !== undefined, useTextVariant(props.variant, props.color)]
			]),
			'flex items-center space-x-1 focus:outline-offset-2',
			{
				'w-full': props.block,
				'justify-center': props.block && props.justify === undefined,
				'text-white hover:bg-opacity-10': props.dark,
				'pointer-events-none opacity-50': props.disabled,
				'justify-center rounded-full': props.icon
			}
		]"
		:disabled="disabled"
		:to="props.to || undefined"
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
	</component>
</template>
