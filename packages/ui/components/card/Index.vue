<script setup lang="ts">
import { computed } from 'vue'

import { useBorderRadius } from '@/composables/useBorderRadius'
import { usePadding } from '@/composables/usePadding'
import { useTailwindClasses } from '@/composables/useTailwindClasses'
import { useTextColor } from '@/composables/useTextColor'
import { useVariant } from '@/composables/card/useVariant'

import Header from '@/components/header/Index.vue'

import type { BorderRadius, Color, Padding, Variant } from '@/types/card'

interface Props {
	active?: boolean
	color?: Color
	href?: string
	interactive?: boolean
	padding?: Padding
	rounded?: BorderRadius
	textColor?: Color
	to?: string
	variant?: Variant
}

const props = withDefaults(defineProps<Props>(), {
	active: false,
	color: 'default',
	href: undefined,
	interactive: false,
	padding: 'md',
	rounded: 'md',
	textColor: 'default',
	to: undefined,
	variant: 'default'
})

const isInteractive = computed<boolean>(() => props.interactive || props.to !== undefined)

const elementType = computed(() => (props.to ? resolveComponent('NuxtLink') : 'div'))
</script>

<template>
	<component
		:is="elementType"
		:to="props.to"
		:class="[
			useTailwindClasses([
				useBorderRadius(props.rounded),
				useTextColor(props.textColor),
				useVariant(props.variant, props.color).defaultVariant,
				[props.active, useVariant(props.variant, props.color).active || ''],
				[isInteractive, useVariant(props.variant, props.color).interactive || '']
			]),
			{ block: props.to !== undefined, 'cursor-pointer': isInteractive }
		]"
	>
		<Header
			v-if="$slots['title'] || $slots['subtitle'] || $slots['header-append']"
			:class="usePadding(props.padding)"
		>
			<template #title>
				<slot name="title" />
			</template>
			<template #subtitle>
				<slot name="subtitle" />
			</template>
			<template #append>
				<slot name="header-append" />
			</template>
		</Header>
		<div
			v-if="$slots['prepend'] || $slots['default'] || $slots['append']"
			:class="usePadding(props.padding)"
		>
			<div v-if="$slots['append']">
				<slot name="prepend" />
			</div>

			<div v-if="$slots['default'] || $slots['body']">
				<slot />
				<slot name="body" />
			</div>

			<div v-if="$slots['append']">
				<slot name="append" />
			</div>
		</div>
	</component>
</template>
