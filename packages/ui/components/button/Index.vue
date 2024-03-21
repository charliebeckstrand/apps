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
				'justify-center rounded-full': props.icon,
				'justify-center': props.block && props.justify === undefined,
				'pointer-events-none opacity-50': props.disabled,
				'text-white hover:bg-opacity-10': props.dark,
				'w-full': props.block
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
