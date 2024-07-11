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

const isActive = computed<boolean>(() => conversationStore.selectedConversation?.id === props.conversation.id)

const selectConversation = () => {
	conversationStore.selectConversation(props.conversation)

	layoutStore.sidebarOpen = false
}

const removeConversation = (conversation: Conversation) => {
	conversationStore.removeConversation(conversation)
}

const conversationName = (name: string | null) => {
	if (name?.includes('```')) {
		return name.replace(/```[\s\S]*?```/g, '')
	} else {
		return name
	}
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
		:active="isActive"
		interactive
		class="conversation-card"
		@click="selectConversation"
	>
		<div class="flex items-center justify-between">
			<div class="flex-grow">
				<UIHeader>
					<template #title>
						<span class="line-clamp-1 leading-tight text-white">
							{{ conversationName(conversation.name) ?? 'New Conversation' }}
						</span>
					</template>
					<template #subtitle>
						<div class="mb-1 flex flex-col">
							<div class="text-accent font-extrabold">{{ conversation.model }}</div>
						</div>
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
	.remove {
		// visibility: hidden;
		display: none;
	}

	&:hover {
		.remove {
			// visibility: visible;
			display: block;
		}
	}
}
</style>
