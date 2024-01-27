<script setup lang="ts">
import { CameraIcon } from '@heroicons/vue/24/outline'

interface Props {
	src: string
	height?: string
	width?: string
	editable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	src: '',
	height: '48',
	width: '48',
	editable: false
})
</script>

<template>
	<div class="ui-thumbnail relative rounded-full">
		<img
			:src="props.src"
			:height="props.height"
			:width="props.width"
			:alt="props.src"
			class="rounded-full shadow-lg"
			:style="`min-width: ${props.width}px`"
		/>
		<div
			v-if="props.editable"
			class="overlay bg-accent/50 absolute inset-0 z-20 flex cursor-pointer items-center rounded-full opacity-0 hover:opacity-100"
		>
			<UIIcon
				:icon="CameraIcon"
				class="m-auto text-white"
				size="lg"
			/>
		</div>
	</div>
</template>
