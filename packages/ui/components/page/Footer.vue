<script setup lang="ts">
type Props = {
	fixed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	fixed: false
})
</script>

<template>
	<div
		class="ui-page-footer width-full flex items-center space-x-2 border-t p-5"
		:class="{ 'fixed bottom-0 left-0 right-0 z-20 bg-white': props.fixed }"
	>
		<slot />
	</div>
</template>
