<script setup lang="ts">
import { computed } from 'vue'

import { useTailwindClasses } from '@/composables/useTailwindClasses'
import { useFontWeight } from '@/composables/useFontWeight'
import { useTextColor } from '@/composables/useTextColor'
import { useTextSize } from '@/composables/useTextSize'

import type { Color, FontWeight, Size, Tag } from '@/types/heading'

interface Props {
	color?: Color
	size?: Size
	tag?: Tag
	weight?: FontWeight
}

const props = withDefaults(defineProps<Props>(), {
	color: 'default',
	tag: 'div',
	size: 'md',
	weight: 'normal'
})

const elementType = computed(() => (props.tag as string).toLowerCase())
</script>

<template>
	<component
		:is="elementType"
		:class="useTailwindClasses([useTextColor(props.color), useTextSize(props.size), useFontWeight(props.weight)])"
	>
		<slot />
	</component>
</template>
