<script setup lang="ts">
import { useConversationStore } from '@/stores/conversation'

const conversationStore = useConversationStore()
</script>

<template>
	<div class="flex flex-col space-y-4 px-4">
		<div
			v-for="(message, index) in conversationStore.selectedConversation?.messages"
			:key="index"
			:class="{
				'ml-auto': message.type === 'bot' || message.type === 'system',
				'mr-auto': message.type === 'user'
			}"
		>
			<ConversationMessage
				:message="message"
				:color="
					message.type === 'bot' || message.type === 'system'
						? 'gray'
						: message.type === 'user'
						? 'accent'
						: undefined
				"
			/>
		</div>

		<ConversationLoading v-if="conversationStore.loadingResponse" />
	</div>
</template>
