<script setup lang="ts">
const route = useRoute()

const pageTitle = computed(() => {
	const title = route.meta.title as string
	return title
})
</script>

<template>
	<UIHeader class="p-4">
		<UIHeading
			size="2xl"
			weight="bold"
		>
			{{ pageTitle }}
		</UIHeading>
	</UIHeader>
</template>
