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

const classes = computed(() => {
	const colorMap: Record<Color, string> = {
		primary: 'bg-primary',
		secondary: 'bg-secondary',
		gray: 'bg-gray-100'
	}

	const classes = ['ui-sidebar h-full min-h-full flex flex-col px-4 overflow-hidden']

	if (props.color) {
		const color = colorMap[props.color]

		if (color) {
			classes.push(color)
		}
	}

	return classes.join(' ')
})

const width = computed(() => props.width ?? '320px')
</script>

<template>
	<div
		:class="classes"
		:style="{ width: width, minWidth: width }"
	>
		<slot name="prepend" />

		<div class="flex-grow overflow-y-auto">
			<slot />
		</div>

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
