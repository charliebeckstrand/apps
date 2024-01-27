<script setup lang="ts">
type Color = 'primary' | 'secondary'

interface Props {
	color?: Color
	width?: string
}

const props = withDefaults(defineProps<Props>(), {
	color: 'primary',
	width: undefined
})

const baseClasses = computed(() => `flex h-full flex-col`)

const colorClasses = computed(() => {
	const colorMap: Record<Color, string> = {
		primary: 'bg-primary',
		secondary: 'bg-secondary'
	}

	return colorMap[props.color]
})

const width = computed(() => (props.width ? props.width : '280px'))
</script>

<template>
	<div
		:class="[baseClasses, colorClasses]"
		:style="{ width: width, minWidth: width }"
	>
		<slot name="prepend" />

		<div class="flex grow overflow-hidden pb-4">
			<div class="grow overflow-y-auto px-4">
				<slot />
			</div>
		</div>

		<slot name="append" />
	</div>
</template>
