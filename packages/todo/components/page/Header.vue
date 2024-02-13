<script setup lang="ts">
const route = useRoute()

const pageTitle = computed(() => {
	const title = route.meta.title as string
	return title
})
</script>

<template>
	<UIPageHeader>
		<template #title>{{ pageTitle }}</template>
	</UIPageHeader>
</template>
