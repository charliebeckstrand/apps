<script setup lang="ts">
import { computed } from 'vue'

import { useColor } from '@/composables/useColor'
import { useTailwindClasses } from '@/composables/useTailwindClasses'

import type { Color } from '@/types/sidebar'

interface Props {
	color?: Color
	width?: string
}

const props = withDefaults(defineProps<Props>(), {
	color: 'primary',
	width: undefined
})

const { color, width } = toRefs(props)

const maxWidth = computed(() => width.value ?? '320px')
</script>

<template>
	<div
		:class="[
			useTailwindClasses([useColor(color)]),
			'ui-sidebar flex h-full min-h-full flex-col overflow-hidden px-4'
		]"
		:style="{ width: maxWidth, minWidth: maxWidth }"
	>
		<slot name="prepend" />

		<div class="flex-grow overflow-y-auto">
			<slot />
		</div>

		<div class="pb-4">
			<slot name="append" />
		</div>
	</div>
</template>

<style scoped lang="scss">
.ui-sidebar {
	max-height: 100vh;
}
</style>
