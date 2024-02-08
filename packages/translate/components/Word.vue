<script setup lang="ts">
interface Props {
	interactive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	interactive: true
})
</script>

<template>
	<div
		class="bg-primary/5 inline-flex select-none rounded p-1"
		:class="{ 'hover:bg-primary cursor-pointer hover:text-white': props.interactive }"
	>
		<slot />
	</div>
</template>
