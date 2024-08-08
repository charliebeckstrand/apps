<script setup lang="ts">
import type { Conversation } from '@/types/conversation'

const props = defineProps<{
	conversation: Conversation
}>()

const conversationName = (name: string | null) => {
	if (name?.includes('```')) {
		return name.replace(/```[\s\S]*?```/g, '')
	} else {
		return name
	}
}
</script>

<template>
	<div class="line-clamp-1 leading-tight">
		{{ conversationName(props.conversation.name) ?? 'New Conversation' }}
	</div>
</template>
