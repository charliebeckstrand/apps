<script setup lang="ts">
import { useConversationStore } from '@/stores/conversation'

const conversationStore = useConversationStore()

const props = defineProps<{
	searchTerm: string
}>()

const conversationRefs = ref<Record<string, any>>({})
const conversations = conversationStore.conversations
const previousConversations = ref(conversations.map((conv) => ({ ...conv })))

const selectedConversation = computed(() => conversationStore.selectedConversation)

const setRef = (component: any) => {
	if (component) {
		const id = component.$props.conversation.id

		conversationRefs.value[id] = component.$el

		const isNewConversation = !previousConversations.value.some((conv) => conv.id === id)

		if (isNewConversation) {
			nextTick(() => {
				conversationRefs.value[id].scrollIntoViewIfNeeded()
			})

			// Update the previousConversations to include the new conversation
			previousConversations.value.push(component.$props.conversation)
		}
	}
}

const sortedConversations = computed(() => {
	return conversationStore.conversations.sort((a: any, b: any) => {
		return b.createdAt - a.createdAt
	})
})

const filteredConversations = computed(() => {
	const { value: conversations } = sortedConversations

	if (props.searchTerm) {
		const searchTerm = props.searchTerm.toLowerCase()

		return conversations.filter((conversation: any) => {
			const name = conversation.name ? conversation.name.toLowerCase() : ''

			return name.includes(searchTerm)
		})
	}

	return conversations
})

// watch conversations and set page title to the selected conversation name
watch(
	selectedConversation,
	(selectedConversation) => {
		document.title = `Chat${selectedConversation ? ` - ${selectedConversation.name ?? 'New Conversation'}` : ''}`
	},
	{ immediate: true }
)
</script>

<template>
	<div class="space-y-2">
		<template v-if="sortedConversations.length > 0">
			<ConversationsListCard
				:ref="setRef"
				v-for="(conversation, index) in filteredConversations"
				:key="index"
				:conversation="conversation"
			/>
		</template>
		<template v-if="props.searchTerm && !filteredConversations.length">
			<UIAlert
				color="warning"
				text-color="white"
				variant="tonal"
			>
				No conversations match your search term
			</UIAlert>
		</template>
		<template v-else-if="!props.searchTerm && !filteredConversations.length">
			<UIAlert
				color="warning"
				text-color="white"
				variant="tonal"
				dark
			>
				<template #title>No conversations</template>
				Add a new conversation to start chatting
			</UIAlert>
		</template>
	</div>
</template>
