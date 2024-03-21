<script setup lang="ts">
import Icon from '@/components/icon/Index.vue'

import { CameraIcon } from '@heroicons/vue/24/outline'

interface Props {
	editable?: boolean
	height?: string
	src: string
	width?: string
}

const props = withDefaults(defineProps<Props>(), {
	editable: false,
	height: '48',
	src: '',
	width: '48'
})
</script>

<template>
	<div class="relative rounded-full">
		<img
			class="rounded-full shadow-lg"
			:src="props.src"
			:height="props.height"
			:width="props.width"
			:alt="props.src"
			:style="`min-width: ${props.width}px`"
		/>
		<div
			v-if="props.editable"
			class="overlay bg-accent/50 absolute inset-0 z-20 flex cursor-pointer items-center rounded-full opacity-0 hover:opacity-100"
		>
			<Icon
				:icon="CameraIcon"
				class="m-auto text-white"
				size="lg"
			/>
		</div>
	</div>
</template>
