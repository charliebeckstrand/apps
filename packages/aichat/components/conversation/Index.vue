<script setup lang="ts">
import { useConversationStore } from '@/stores/conversation'

const conversationStore = useConversationStore()
</script>

<template>
	<div class="flex flex-col space-y-3 px-5">
		<ConversationMessage
			v-for="(message, index) in conversationStore.selectedConversation?.messages"
			:key="index"
			:message="message"
		/>

		<ConversationLoading
			v-if="conversationStore.loadingResponse"
			class="pt-3"
		/>
	</div>
</template>
