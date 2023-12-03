<script setup lang="ts">
import { Bars3Icon } from '@heroicons/vue/24/outline'

import { useLayoutStore } from '@/stores/layout'

const layoutStore = useLayoutStore()
</script>

<template>
	<UIButton
		icon
		class="lg:hidden"
		@click="layoutStore.sidebarOpen = true"
	>
		<span class="sr-only">Open sidebar</span>
		<UIIcon :icon="Bars3Icon" />
	</UIButton>
</template>
