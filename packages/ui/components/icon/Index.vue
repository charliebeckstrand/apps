<script setup lang="ts">
import { useTailwindClasses } from '@/composables/useTailwindClasses'
import { useSize } from '@/composables/icon/useSize'

import type { Size } from '@/types/icon'

interface Props {
	size?: Size
	icon: any
}

const props = withDefaults(defineProps<Props>(), {
	size: 'md',
	icon: undefined
})
</script>

<template>
	<component
		:is="props.icon"
		:class="useTailwindClasses([useSize(props.size)])"
	/>
</template>
