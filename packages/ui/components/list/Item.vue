<script setup lang="ts">
import { computed } from 'vue'

import { useColor } from '@/composables/list/useColor'
import { useTailwindClasses } from '@/composables/useTailwindClasses'

import type { Color } from '@/types/list'

interface Props {
	color?: Color
	to?: string
}

const props = withDefaults(defineProps<Props>(), {
	color: 'default',
	to: undefined
})

const elementType = computed(() => (props.to ? resolveComponent('NuxtLink') : 'li'))
</script>

<template>
	<component
		:is="elementType"
		:class="[useTailwindClasses([useColor(props.color)]), 'flex items-center']"
		:to="props.to"
	>
		<div class="prepend mr-1 empty:mr-0">
			<slot name="prepend" />
		</div>

		<div>
			<slot />
		</div>

		<div class="append ml-1 empty:ml-0">
			<slot name="append" />
		</div>
	</component>
</template>
