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
					'ml-auto pl-10': message.type === 'bot' || message.type === 'system',
					'mr-auto pr-10': message.type === 'user'
				}
			]"
		>
			<!-- <div
				:class="[
					'absolute rounded-full bg-[#16CEAA] p-4',
					{
						'-right-4 -top-4': message.type === 'bot' || message.type === 'system',
						'-left-4 -top-4': message.type === 'user'
					}
				]"
			/> -->

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
