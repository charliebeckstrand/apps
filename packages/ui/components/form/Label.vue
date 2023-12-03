<script setup lang="ts">
type Size = 'sm' | 'md' | 'lg'

interface Props {
	size?: Size
}

const props = withDefaults(defineProps<Props>(), {
	size: 'md'
})
</script>

<template>
	<label
		:class="{ 'text-sm': props.size === 'sm', 'text-base': props.size === 'md', 'text-lg': props.size === 'lg' }"
	>
		<slot />
	</label>
</template>

<style scoped lang="scss"></style>
