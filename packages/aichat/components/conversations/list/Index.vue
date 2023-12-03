<script setup lang="ts">
import { useConversationStore } from '@/stores/conversation'

const conversationStore = useConversationStore()

const props = defineProps<{
	searchTerm: string
}>()

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
			const name = conversation.name.toLowerCase()

			return name.includes(searchTerm)
		})
	}

	return conversations
})
</script>

<template>
	<div class="space-y-2">
		<template v-if="sortedConversations.length > 0">
			<ConversationsListCard
				v-for="(conversation, index) in filteredConversations"
				:key="index"
				:conversation="conversation"
			/>
		</template>
		<template v-if="props.searchTerm && !filteredConversations.length">
			<UIAlert
				color="warning"
				variant="tonal"
				dark
			>
				<!-- <template #title>No conversations found</template> -->
				No conversations match your search term
			</UIAlert>
		</template>
		<template v-else-if="!props.searchTerm && !filteredConversations.length">
			<UIAlert
				color="warning"
				variant="tonal"
			>
				<template #title>No conversations</template>
				Click the plus icon to create a new one
			</UIAlert>
		</template>
	</div>
</template>
