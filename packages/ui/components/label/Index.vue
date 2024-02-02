<script setup lang="ts">
import { computed } from 'vue'

import type { Size } from '@/types/base/size'

interface Props {
	size?: Size
}

const props = withDefaults(defineProps<Props>(), {
	size: 'md'
})

const sizeClasses = computed<string>(() => {
	const classMap: Record<Size, string> = {
		sm: 'text-sm',
		md: 'text-base',
		lg: 'text-lg'
	}

	return classMap[props.size]
})
</script>

<template>
	<div :class="[sizeClasses]">
		<slot />
	</div>
</template>
