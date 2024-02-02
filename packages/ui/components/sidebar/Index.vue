<script setup lang="ts">
type Color = 'primary' | 'secondary' | 'gray'

interface Props {
	color?: Color
	width?: string
}

const props = withDefaults(defineProps<Props>(), {
	color: 'primary',
	width: undefined
})

const baseClasses = computed(() => `ui-sidebar h-full min-h-full flex flex-col px-4 overflow-hidden`)

const colorClasses = computed(() => {
	const colorMap: Record<Color, string> = {
		primary: 'bg-primary',
		secondary: 'bg-secondary',
		gray: 'bg-gray-100'
	}

	return colorMap[props.color]
})

const width = computed(() => (props.width ? props.width : '300px'))
</script>

<template>
	<div
		:class="[baseClasses, colorClasses]"
		:style="{ width: width, minWidth: width }"
	>
		<slot name="prepend" />

		<slot />

		<div class="pb-4">
			<slot name="append" />
		</div>
	</div>
</template>

<style scoped lang="scss">
.ui-sidebar {
	max-height: 100vh;
}
</style>
