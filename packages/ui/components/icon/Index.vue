<script setup lang="ts">
import { useSize } from '@/composables/icon/useSize'
import { useTailwindClasses } from '@/composables/useTailwindClasses'

import type { Size } from '@/types/icon'

interface Props {
	icon: any
	size?: Size
}

const props = withDefaults(defineProps<Props>(), {
	icon: undefined,
	size: 'md'
})
</script>

<template>
	<component
		:is="props.icon"
		:class="useTailwindClasses([useSize(props.size)])"
	/>
</template>
