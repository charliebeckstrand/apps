<script setup lang="ts">
import { toRefs } from 'vue'

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

const { icon, size } = toRefs(props)
</script>

<template>
	<component
		:is="icon"
		:class="useTailwindClasses([useSize(size)])"
	/>
</template>
