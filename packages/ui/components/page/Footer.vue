<script setup lang="ts">
interface Props {
	fixed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	fixed: false
})

const baseClasses = computed<string>(
	() =>
		`ui-page-footer width-full flex items-center space-x-2 border-t p-4 ${[
			props.fixed ? 'fixed bottom-0 left-0 right-0 z-20 bg-white' : undefined
		]}`
)
</script>

<template>
	<div :class="[baseClasses]">
		<slot />
	</div>
</template>
