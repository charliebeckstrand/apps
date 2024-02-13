<script setup lang="ts">
const loaded = ref(false)

onMounted(() => {
	loaded.value = true
})
</script>

<template>
	<div class="flex h-full">
		<!-- <Sidebar /> -->
		<div
			v-if="loaded"
			class="flex h-full flex-grow flex-col overflow-hidden"
		>
			<PageHeader color="undefined" />

			<div class="flex h-full flex-grow flex-col p-4 pt-0">
				<div class="h-full flex-grow overflow-x-auto">
					<NuxtPage />
				</div>
			</div>
		</div>
	</div>
</template>
