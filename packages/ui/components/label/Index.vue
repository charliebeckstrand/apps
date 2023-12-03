<script setup lang="ts">
type Size = 'sm' | 'md' | 'lg'

type Props = {
	size?: Size
}

const props = withDefaults(defineProps<Props>(), {
	size: 'md'
})

const sizeClasses = computed<string>(() => {
	const classes: Record<Size, string> = {
		sm: 'text-sm',
		md: 'text-base',
		lg: 'text-lg'
	} as const

	return classes[props.size]
})
</script>

<template>
	<div :class="[sizeClasses]">
		<slot />
	</div>
</template>

<style scoped lang="scss"></style>
