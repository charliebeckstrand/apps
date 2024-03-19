<script setup lang="ts">
import { useBackgroundColor } from '@/composables/useBackgroundColor'
import { useTailwindClasses } from '@/composables/useTailwindClasses'
import { usePadding } from '@/composables/usePadding'
import { useTextColor } from '@/composables/useTextColor'

import Heading from '@/components/heading/Index.vue'

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
</script>

<template>
	<div
		:class="
			useTailwindClasses([
				useBackgroundColor(props.color),
				usePadding(props.padding),
				useTextColor(props.textColor)
			])
		"
	>
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
