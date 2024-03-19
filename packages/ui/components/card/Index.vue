<script setup lang="ts">
import { computed } from 'vue'

import { useBorderRadius } from '@/composables/useBorderRadius'
import { useTailwindClasses } from '@/composables/useTailwindClasses'
import { usePadding } from '@/composables/usePadding'
import { useTextColor } from '@/composables/useTextColor'
import { useVariant } from '@/composables/card/useVariant'

import Header from '@/components/header/Index.vue'

import type { BorderRadius, Color, Padding, Variant } from '@/types/card'

interface Props {
	color?: Color
	textColor?: Color
	variant?: Variant
	rounded?: BorderRadius
	padding?: Padding
	to?: string
	href?: string
	active?: boolean
	interactive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	color: 'default',
	textColor: 'default',
	variant: 'default',
	rounded: 'md',
	padding: 'md',
	to: undefined,
	href: undefined,
	active: false,
	interactive: false
})

const paddingClasses = computed<string>(() => usePadding(props.padding))

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
				[props.interactive, useVariant(props.variant, props.color).interactive || '']
			]),
			{ block: props.to !== undefined, 'cursor-pointer': props.interactive }
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
			:class="paddingClasses"
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

<style scoped lang="scss"></style>
