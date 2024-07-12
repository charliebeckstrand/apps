<script setup lang="ts">
import { useConversationStore } from '@/stores/conversation'

const conversationStore = useConversationStore()
</script>

<template>
	<div class="flex flex-col space-y-4 px-4">
		<div
			v-for="(message, index) in conversationStore.selectedConversation?.messages"
			:key="index"
			:class="[
				'relative',
				{
					'ml-auto pl-[15%]': message.type === 'user',
					'mr-auto pr-[15%]': message.type === 'bot' || message.type === 'system'
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
