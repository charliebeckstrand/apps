<script setup lang="ts">
import { computed } from 'vue'

import { textSizeMap } from '@/constants/mapping'

import type { Size } from '@/types/base/size'

interface Props {
	size?: Size
	tag?: 'label' | 'div'
}

const props = withDefaults(defineProps<Props>(), {
	size: 'md',
	tag: 'div'
})

const classes = computed<string>(() => textSizeMap[props.size])

const elementType = computed(() => (props.tag === 'label' ? resolveComponent('label') : 'div'))
</script>

<template>
	<component
		:is="elementType"
		:class="classes"
	>
		<slot />
	</component>
</template>
