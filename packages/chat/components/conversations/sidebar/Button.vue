<script setup lang="ts">
import { Bars2Icon } from '@heroicons/vue/24/solid'

import { useLayoutStore } from '@/stores/layout'

const layoutStore = useLayoutStore()
</script>

<template>
	<UIButton
		v-tippy="{ content: 'Show Sidebar' }"
		variant="text"
		icon
		@click="layoutStore.sidebarOpen = true"
	>
		<span class="sr-only">Open sidebar</span>
		<UIIcon :icon="Bars2Icon" />
	</UIButton>
</template>
