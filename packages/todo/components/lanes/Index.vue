<script setup lang="ts">
import { useAppStore } from '@/stores/app'

const { lanes } = useAppStore()
</script>

<template>
	<div class="flex h-full w-full grid-cols-3 space-x-4">
		<LanesLane
			v-for="lane in lanes"
			:key="lane.id"
			:lane="lane"
		/>
	</div>
</template>
