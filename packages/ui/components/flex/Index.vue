<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
	grow?: boolean
}>()

const baseClasses = computed<string>(() => {
	const classes = 'flex flex-col items-center space-y-3 lg:flex-row lg:space-x-3 lg:space-y-0'

	return classes
})
</script>

<template>
	<div :class="[baseClasses, { grow: props.grow }]">
		<slot />
	</div>
</template>

<style scoped lang="scss">
.grow :deep(> *) {
	@apply flex-grow;
}
</style>
