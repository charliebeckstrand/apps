<script setup lang="ts">
import { useTextSize } from '@/composables/useTextSize'

import { computed } from 'vue'

import type { Size } from '@/types/base/size'

interface Props {
	size?: Size
	tag?: 'label' | 'div'
}

const props = withDefaults(defineProps<Props>(), {
	size: 'md',
	tag: 'div'
})

const classes = computed<string>(() => useTextSize(props.size))

const elementType = computed(() => (props.tag === 'label' ? 'label' : 'div'))
</script>

<template>
	<component
		:is="elementType"
		:class="classes"
	>
		<slot />
	</component>
</template>
