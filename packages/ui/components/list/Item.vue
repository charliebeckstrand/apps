<script setup lang="ts">
import { computed, resolveComponent } from 'vue'

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

const { color, to } = toRefs(props)

const elementType = computed(() => (to.value ? resolveComponent('NuxtLink') : 'li'))
</script>

<template>
	<component
		:is="elementType"
		:class="['flex items-center', useTailwindClasses([useColor(color)])]"
		:to="to"
	>
		<div
			v-if="$slots.prepend"
			class="prepend mr-1 empty:mr-0"
		>
			<slot name="prepend" />
		</div>

		<div>
			<slot />
		</div>

		<div
			v-if="$slots.append"
			class="append ml-1 empty:ml-0"
		>
			<slot name="append" />
		</div>
	</component>
</template>
