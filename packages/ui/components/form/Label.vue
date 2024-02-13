<script setup lang="ts">
import type { Size } from '@/types/base/size'

interface Props {
	size?: Size
}

const props = withDefaults(defineProps<Props>(), {
	size: 'md'
})

const sizeClasses = computed<string>(() => {
	const sizeMap: Record<Size, string> = {
		sm: 'text-sm',
		md: 'text-base',
		lg: 'text-lg'
	}

	return sizeMap[props.size]
})
</script>

<template>
	<label :class="sizeClasses">
		<slot />
	</label>
</template>
