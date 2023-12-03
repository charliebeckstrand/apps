<script setup lang="ts">
import type { Message } from '@/types/message'

const props = defineProps<{
	message: Message
}>()

const setRef = (component: any) => {
	nextTick(() => {
		if (!component) return

		component.scrollIntoViewIfNeeded()
	})
}
</script>

<template>
	<div
		:ref="setRef"
		class="max-w-[80%]] break-all rounded-lg p-3 text-white"
		:class="{
			'ml-auto bg-gray-600': props.message.type === 'bot' || props.message.type === 'system',
			'bg-accent mr-auto': props.message.type === 'user'
		}"
	>
		<div v-html="props.message.value" />
	</div>
</template>
