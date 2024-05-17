<script setup lang="ts">
import { toRefs } from 'vue'

interface Props {
	grow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	grow: false
})

const { grow } = toRefs(props)
</script>

<template>
	<div :class="['flex flex-col items-center space-y-3 lg:flex-row lg:space-x-4 lg:space-y-0', grow ?? 'grow']">
		<slot />
	</div>
</template>

<style scoped lang="scss">
.grow :deep(> *) {
	@apply flex-grow;
}
</style>
