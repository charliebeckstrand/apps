<script setup lang="ts">
import { useTailwindClasses } from '@/composables/useTailwindClasses'
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

const elementType = computed(() => (props.tag === 'label' ? 'label' : 'div'))
</script>

<template>
	<component
		:is="elementType"
		:class="useTailwindClasses([useTextSize(props.size)])"
	>
		<slot />
	</component>
</template>
