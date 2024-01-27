<script setup lang="ts">
import { computed } from 'vue'

type Size = 'xs' | 'sm' | 'md' | 'lg'

interface Props {
	size?: Size
	icon: any
}

const props = withDefaults(defineProps<Props>(), {
	size: 'sm',
	icon: undefined
})

const sizeClasses = computed<string>(() => {
	const sizes: Record<string, string> = {
		xs: 'w-4 h-4',
		sm: 'w-5 h-5',
		md: 'w-6 h-6',
		lg: 'w-7 h-7'
	}

	return sizes[props.size]
})
</script>

<template>
	<component
		:is="props.icon"
		:class="[sizeClasses]"
	/>
</template>
