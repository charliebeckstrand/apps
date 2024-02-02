<script setup lang="ts">
import { Bars3Icon } from '@heroicons/vue/24/outline'

import { useConversationStore } from '@/stores/conversation'

const conversationStore = useConversationStore()
</script>
<template>
	<div class="flex h-full flex-col">
		<template v-if="conversationStore.selectedConversation?.id">
			<UIHeader class="h-[4.5rem] min-h-[4.5rem] px-2">
				<template #prepend>
					<ConversationsSidebarButton />
				</template>

				<template #title>
					{{ conversationStore.selectedConversation?.name }}
				</template>
				<template #subtitle>
					{{ conversationStore.selectedConversation?.id }}
				</template>
			</UIHeader>

			<div class="mx-5 flex flex-1 grow overflow-hidden rounded-lg border bg-gray-50 py-5">
				<div class="flex-1 grow overflow-y-auto">
					<Conversation />
				</div>
			</div>

			<ConversationTextarea :disabled="conversationStore.loadingResponse" />
		</template>
		<template v-else>
			<div class="px-2 py-4 lg:hidden">
				<ConversationsSidebarButton />
			</div>
			<UIAlert
				color="danger"
				variant="tonal"
				class="mx-5 lg:my-5"
			>
				<template #title>No conversation selected</template>
				{{
					conversationStore.conversations?.length
						? 'Select a conversation from the sidebar to start chatting'
						: 'Create a new conversation from the sidebar to start chatting'
				}}
			</UIAlert>
		</template>
	</div>
</template>
