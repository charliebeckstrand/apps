<script setup lang="ts">
interface Props {
	fixed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	fixed: false
})

const classes = computed<string>(() => {
	const classes = ['ui-page-footer width-full flex items-center space-x-2 border-t p-4']

	if (props.fixed) {
		classes.push('fixed bottom-0 left-0 right-0 z-20 bg-white')
	}

	return classes.join(' ')
})
</script>

<template>
	<div :class="classes">
		<slot />
	</div>
</template>
