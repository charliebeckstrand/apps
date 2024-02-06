<script setup lang="ts">
interface Props {
	src: string
}

const props = withDefaults(defineProps<Props>(), {
	src: undefined
})
</script>

<template>
	<img
		:src="`/flags/${props.src}.png`"
		:alt="props.src"
		class="h-5 w-5"
	/>
</template>
