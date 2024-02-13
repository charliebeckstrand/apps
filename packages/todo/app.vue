<script setup lang="ts">
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

appStore.setLanes([
	{
		id: 'todo',
		name: 'To Do'
	},
	{
		id: 'in-progress',
		name: 'In Progress'
	},
	{
		id: 'finished',
		name: 'Finished'
	}
])
</script>

<template>
	<NuxtLayout />
</template>
