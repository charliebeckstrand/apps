<script setup lang="ts">
import { computed } from 'vue'

interface Props {
	grow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	grow: false
})

const classes = computed(() => {
	const classes = ['flex flex-col items-center space-y-3 lg:flex-row lg:space-x-4 lg:space-y-0']

	if (props.grow) {
		classes.push('grow')
	}

	return classes.join(' ')
})
</script>

<template>
	<div :class="classes">
		<slot />
	</div>
</template>

<style scoped lang="scss">
.grow :deep(> *) {
	@apply flex-grow;
}
</style>
