<script setup lang="ts">
import Heading from '@/components/heading/Index.vue'

import { computed } from 'vue'

import { useBackgroundColor } from '@/composables/useBackgroundColor'
import { usePadding } from '@/composables/usePadding'
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

const classes = computed<string>(() => {
	const classes = ['']

	if (props.color) {
		classes.push(useBackgroundColor(props.color))
	}

	if (props.padding) {
		classes.push(usePadding(props.padding))
	}

	if (props.textColor) {
		classes.push(useTextColor(props.textColor))
	}

	return classes.join(' ')
})
</script>

<template>
	<div :class="classes">
		<Heading
			v-if="$slots['title']"
			size="lg"
			weight="bold"
		>
			<slot name="title" />
		</Heading>
		<slot />
	</div>
</template>
