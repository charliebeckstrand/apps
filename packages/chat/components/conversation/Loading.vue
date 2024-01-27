<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		lines?: number
	}>(),
	{
		lines: 3
	}
)

const setRef = (component: any) => {
	nextTick(() => {
		if (component?.$el) {
			component.$el.scrollIntoViewIfNeeded()
		}
	})
}
</script>

<template>
	<UISkeletonText
		:ref="setRef"
		:lines="props.lines"
		class="ml-auto"
	/>
</template>
