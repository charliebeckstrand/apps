<script setup lang="ts">
import { computed, resolveComponent, toRefs } from 'vue'

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

const { active, color, interactive, rounded, textColor, to, variant } = toRefs(props)

const isInteractive = computed<boolean>(() => interactive.value || to.value !== undefined)

const elementType = computed(() => (to.value ? resolveComponent('NuxtLink') : 'div'))
</script>

<template>
	<component
		:is="elementType"
		:to="to"
		:class="[
			{ 'cursor-pointer': isInteractive, block: to !== undefined },
			useTailwindClasses([
				useBorderRadius(rounded),
				useTextColor(textColor),
				useVariant(variant, color).defaultVariant,
				[active, useVariant(variant, color).active || ''],
				[isInteractive, useVariant(variant, color).interactive || '']
			])
		]"
	>
		<Header
			v-if="$slots.title || $slots.subtitle || $slots['header-append']"
			:class="usePadding(padding)"
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
			v-if="$slots.prepend || $slots.default || $slots.append"
			:class="usePadding(padding)"
		>
			<div v-if="$slots.append">
				<slot name="prepend" />
			</div>

			<div v-if="$slots.default || $slots.body">
				<slot />
				<slot name="body" />
			</div>

			<div v-if="$slots.append">
				<slot name="append" />
			</div>
		</div>
	</component>
</template>
