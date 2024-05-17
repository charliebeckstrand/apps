<script setup lang="ts">
import Heading from '@/components/heading/Index.vue'

import { toRefs } from 'vue'

import { useBackgroundColor } from '@/composables/useBackgroundColor'
import { usePadding } from '@/composables/usePadding'
import { useTailwindClasses } from '@/composables/useTailwindClasses'
import { useTextColor } from '@/composables/useTextColor'

import type { Color, Size } from '@/types/banner'

interface Props {
	color?: Color
	padding?: Size
	textColor?: Color
}

const props = withDefaults(defineProps<Props>(), {
	color: 'primary',
	padding: 'md',
	textColor: 'white'
})

const { color, padding, textColor } = toRefs(props)
</script>

<template>
	<div :class="useTailwindClasses([useBackgroundColor(color), usePadding(padding), useTextColor(textColor)])">
		<Heading
			v-if="$slots.title"
			size="lg"
			weight="bold"
		>
			<slot name="title" />
		</Heading>
		<slot />
	</div>
</template>
