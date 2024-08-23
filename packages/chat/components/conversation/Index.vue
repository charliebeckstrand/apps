<script setup lang="ts">
import { useConversationStore } from '@/stores/conversation'

import type { Message } from '@/types/message'

const conversationStore = useConversationStore()

const messages = computed(() => {
	const welcomeMessage: Message = {
		type: 'bot',
		value: 'How can I help you today?',
		createdAt: new Date()
	}
	const messages = conversationStore.selectedConversation?.messages

	return [welcomeMessage, ...(messages || [])]
})
</script>

<template>
	<div class="flex flex-col space-y-4 px-4">
		<div
			v-for="(message, index) in messages"
			:key="index"
			:class="[
				'relative',
				{
					'ml-auto': message.type === 'user',
					'mr-auto': message.type === 'bot' || message.type === 'system'
				}
			]"
		>
			<ConversationMessage
				:message="message"
				:color="
					message.type === 'bot' || message.type === 'system'
						? 'secondary'
						: message.type === 'user'
							? 'accent'
							: undefined
				"
			/>
		</div>

		<ConversationLoading v-if="conversationStore.loadingResponse" />
	</div>
</template>
