<script setup lang="ts">
import { computed, toRefs } from 'vue'

import { XMarkIcon } from '@heroicons/vue/24/outline'

import { useConversationStore } from '@/stores/conversation'
import { useLayoutStore } from '@/stores/layout'

import type { Conversation } from '@/types/conversation'
import type { Message } from '@/types/message'

const conversationStore = useConversationStore()
const layoutStore = useLayoutStore()

const props = defineProps<{
	conversation: Conversation
}>()

const { conversation } = toRefs(props)

const setSelectedConversation = () => {
	conversationStore.selectedConversation = props.conversation
	layoutStore.conversationsSidebarOpen = false
}

const removeConversation = (conversation: Conversation) => {
	conversationStore.removeConversation(conversation)
}

const getLatestResponse = (conversation: Conversation) => {
	const messagesByType = (type: Message['type']) => conversation.messages.filter((message) => message.type === type)

	const latestResponse = messagesByType('system').pop() || messagesByType('bot').pop()

	if (latestResponse?.value.includes('```')) {
		return latestResponse?.value.replace(/```[\s\S]*?```/g, '')
	}

	return latestResponse?.value
}
</script>

<template>
	<UICard
		color="accent"
		variant="plain"
		:active="conversationStore.selectedConversation?.id === props.conversation.id"
		interactive
		class="conversation-card relative"
		@click="setSelectedConversation"
	>
		<div class="flex items-center justify-between">
			<div class="flex-grow">
				<UIHeader>
					<template #title>
						<ConversationTitle
							class="text-white"
							:conversation="conversation"
						/>
					</template>
					<template #subtitle>
						<ConversationModel
							:conversation="conversation"
							:allow-update="false"
							class="text-accent my-1 text-base"
						/>
					</template>
				</UIHeader>

				<span
					v-if="conversation.messages.length"
					class="line-clamp-1 text-gray-300"
				>
					{{ getLatestResponse(conversation) }}
				</span>
			</div>
			<div class="remove">
				<UIButton
					v-tippy="{ content: 'Remove conversation' }"
					icon
					dark
					variant="text"
					@click.stop="removeConversation(conversation)"
				>
					<UIIcon :icon="XMarkIcon" />
				</UIButton>
			</div>
		</div>
	</UICard>
</template>

<style scoped lang="scss">
.conversation-card {
	@media (min-width: 768px) {
		.remove {
			display: none;
		}
		&:hover {
			.remove {
				display: block;
			}
		}
	}
}
</style>
