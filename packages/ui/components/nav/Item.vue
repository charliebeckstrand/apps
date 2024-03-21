<script setup lang="ts">
import { useBorderRadius } from '@/composables/useBorderRadius'
import { usePadding } from '@/composables/usePadding'
import { useTailwindClasses } from '@/composables/useTailwindClasses'

import type { BorderRadius, Color, Padding, Variant } from '@/types/nav'

interface Props {
	color?: Color
	padding?: Padding
	rounded?: BorderRadius
	variant?: Variant
	to?: string
}

const props = withDefaults(defineProps<Props>(), {
	color: 'primary',
	padding: 'md',
	rounded: 'md',
	variant: 'default',
	to: undefined
})

const elementType = computed(() => (props.to ? resolveComponent('NuxtLink') : 'li'))
</script>

<template>
	<component
		:is="elementType"
		:to="props.to"
		:class="[
			useBorderRadius(props.rounded),
			useTailwindClasses([usePadding(props.padding)]),
			'nav-item flex cursor-pointer items-center space-x-4 leading-tight'
		]"
	>
		<div>
			<slot name="prepend" />
		</div>

		<div>
			<slot />
		</div>

		<div>
			<slot name="append" />
		</div>
	</component>
</template>

<style scoped lang="scss">
.nav-item {
	&.router-link-active {
		@apply bg-primary text-white;
	}
}
</style>
