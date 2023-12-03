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
					class="relative z-50 lg:hidden"
					@close="layoutStore.sidebarOpen = false"
				>
					<UIOverlay />

					<div class="fixed inset-0 flex">
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
				<NuxtPage />
			</main>
		</template>
	</div>
</template>
