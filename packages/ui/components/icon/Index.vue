<script setup lang="ts">
import { computed } from 'vue'

import type { Size } from '@/types/icon'

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
		xs: 'w-3 h-3',
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
