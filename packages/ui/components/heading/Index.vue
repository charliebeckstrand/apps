<script setup lang="ts">
import { computed } from 'vue'

import { useFontWeight } from '@/composables/useFontWeight'
import { useTailwindClasses } from '@/composables/useTailwindClasses'
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

const { color, size, tag, weight } = toRefs(props)

const elementType = computed(() => (tag.value as string).toLowerCase())
</script>

<template>
	<component
		:is="elementType"
		:class="useTailwindClasses([useTextColor(color), useTextSize(size), useFontWeight(weight)])"
	>
		<slot />
	</component>
</template>
