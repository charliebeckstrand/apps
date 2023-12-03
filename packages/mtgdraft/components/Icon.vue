<script setup>
import * as Icons from '@heroicons/vue/24/solid'

const props = defineProps({
	icon: {
		type: String,
		default: null
	},
	size: {
		type: String,
		default: 'md'
	}
})

const sizeClasses = computed(() => {
	const base = {
		sm: 'h-4 w-4',
		md: 'h-6 w-6',
		lg: 'h-8 w-8'
	}

	return props.size ? base[props.size] : ''
})
</script>

<template>
	<component :is="Icons[props.icon]" :class="[sizeClasses]" />
</template>

<style scoped></style>
