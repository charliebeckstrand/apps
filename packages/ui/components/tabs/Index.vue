<script setup lang="ts">
interface Props {
	justified?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	justified: false
})
</script>

<template>
	<ul class="flex flex-nowrap overflow-x-auto border-b border-gray-200 text-center font-medium text-gray-500">
		<slot />
	</ul>
</template>
