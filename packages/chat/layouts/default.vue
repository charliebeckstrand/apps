<script setup lang="ts">
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'

import { useRandom } from '@/composables/useRandom'

import { useConversationStore } from '@/stores/conversation'
import { useLayoutStore } from '@/stores/layout'

import type { Conversation } from '@/types/conversation'
import type { Message } from '@/types/message'

const conversationStore = useConversationStore()
const layoutStore = useLayoutStore()

const { randomIdGenerator, randomNameGenerator } = useRandom()

const generateFakeMessages = () => {
	const messages = [] as Message[]

	messages.push({
		type: 'bot',
		value: 'Hello, how can I help you?',
		createdAt: new Date()
	})

	for (let i = 0; i < 20; i++) {
		messages.push({
			type: Math.random() > 0.5 ? 'bot' : 'user',
			value: randomNameGenerator(),
			createdAt: new Date()
		})
	}
	return messages
}

const generateFakeConversations = () => {
	const conversations = [] as Conversation[]

	for (let i = 0; i < 10; i++) {
		conversations.push({
			id: randomIdGenerator(),
			name: randomNameGenerator(),
			messages: generateFakeMessages(),
			createdAt: new Date()
		})
	}
	return conversations
}

const loading = ref(true)

onMounted(() => {
	if (conversationStore.conversations.length === 0) {
		conversationStore.conversations = generateFakeConversations()

		const mostRecentConversation = conversationStore.conversations.sort((a: any, b: any) => {
			return b.createdAt - a.createdAt
		})[0]

		if (!conversationStore.selectedConversation?.id) {
			conversationStore.selectConversation(mostRecentConversation)
		}
	}

	setTimeout(() => {
		loading.value = false
	}, 1000)
})
</script>

<template>
	<div class="flex h-full overflow-hidden">
		<template v-if="loading">
			<UISkeletonText class="m-auto" />
		</template>
		<template v-else>
			<TransitionRoot
				as="template"
				:show="layoutStore.sidebarOpen"
			>
				<Dialog
					as="div"
					class="relative lg:hidden"
					@close="layoutStore.sidebarOpen = false"
				>
					<UIOverlay />

					<div class="fixed inset-0 z-40 flex">
						<TransitionChild
							as="template"
							enter="transition ease-in-out duration-300 transform"
							enter-from="-translate-x-full"
							enter-to="translate-x-0"
							leave="transition ease-in-out duration-300 transform"
							leave-from="translate-x-0"
							leave-to="-translate-x-full"
						>
							<DialogPanel class="relative">
								<ConversationsSidebar />
							</DialogPanel>
						</TransitionChild>
					</div>
				</Dialog>
			</TransitionRoot>

			<div class="hidden lg:flex">
				<ConversationsSidebar />
			</div>

			<main class="h-full w-full">
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
			</main>
		</template>
	</div>
</template>
