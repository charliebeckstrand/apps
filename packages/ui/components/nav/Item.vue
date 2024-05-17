<script setup lang="ts">
import { computed, resolveComponent, toRefs } from 'vue'

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

const { rounded, padding, to } = toRefs(props)

const elementType = computed(() => (to.value ? resolveComponent('NuxtLink') : 'li'))
</script>

<template>
	<component
		:is="elementType"
		:to="to"
		:class="[
			'nav-item flex cursor-pointer items-center space-x-4 leading-tight',
			{
				'text-white hover:text-default': to !== $route.path
			},
			useBorderRadius(rounded),
			useTailwindClasses([usePadding(padding)])
		]"
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

<style scoped lang="scss">
.nav-item {
	&.router-link-active {
		@apply bg-primary text-white;
	}
}
</style>
