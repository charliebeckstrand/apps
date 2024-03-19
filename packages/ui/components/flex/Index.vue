<script setup lang="ts">
interface Props {
	grow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	grow: false
})
</script>

<template>
	<div :class="['flex flex-col items-center space-y-3 lg:flex-row lg:space-x-4 lg:space-y-0', { grow: props.grow }]">
		<slot />
	</div>
</template>

<style scoped lang="scss">
.grow :deep(> *) {
	@apply flex-grow;
}
</style>
