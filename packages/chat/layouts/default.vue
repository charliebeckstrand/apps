<script setup lang="ts">
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'

import { ChevronLeftIcon, ChevronRightIcon, SquaresPlusIcon } from '@heroicons/vue/24/solid'

import { useConversationStore } from '@/stores/conversation'
import { useLayoutStore } from '@/stores/layout'
import { useModelStore } from '@/stores/model'

const conversationStore = useConversationStore()
const layoutStore = useLayoutStore()
const modelStore = useModelStore()

const loading = ref(true)

const sidebarVisible = ref(true)

const toggleConversationsSidebar = () => {
	sidebarVisible.value = !sidebarVisible.value
}

const newConversation = () => {
	// modelStore.
	layoutStore.modelsSidebarOpen = true
}

onMounted(() => {
	if (conversationStore.conversations.length === 0) {
		conversationStore.newConversation()
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
				:show="layoutStore.conversationsSidebarOpen"
			>
				<Dialog
					as="div"
					class="relative lg:hidden"
					@close="layoutStore.conversationsSidebarOpen = false"
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

			<div
				v-if="sidebarVisible"
				class="hidden lg:flex"
			>
				<ConversationsSidebar />
			</div>

			<main class="h-full w-full">
				<div class="flex h-full flex-col">
					<template v-if="conversationStore.selectedConversation?.id">
						<UIHeader class="h-[4.5rem] min-h-[4.5rem] px-2">
							<template #prepend>
								<div class="lg:hidden">
									<ConversationsSidebarButton />
								</div>
								<div class="hidden lg:block">
									<UIButton
										v-tippy="{ content: `${sidebarVisible ? 'Hide' : 'Show'} sidebar` }"
										icon
										color="default"
										variant="text"
										@click="toggleConversationsSidebar"
									>
										<UIIcon :icon="sidebarVisible ? ChevronLeftIcon : ChevronRightIcon" />
									</UIButton>
								</div>
							</template>
							<template #title>
								<ConversationTitle :conversation="conversationStore.selectedConversation" />
							</template>
							<template #subtitle>
								<ConversationModel :conversation="conversationStore.selectedConversation" />
							</template>
							<template #append>
								<UIButton
									v-tippy="{ content: 'New conversation' }"
									variant="text"
									icon
									@click="newConversation"
								>
									<SquaresPlusIcon class="h-6 w-6" />
								</UIButton>
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

			<TransitionRoot
				as="template"
				:show="layoutStore.modelsSidebarOpen"
			>
				<Dialog
					as="div"
					class="relative"
					@close="layoutStore.modelsSidebarOpen = false"
				>
					<UIOverlay />

					<div class="fixed inset-0 z-40 flex">
						<TransitionChild
							as="template"
							enter="transition ease-in-out duration-300 transform"
							enter-from="translate-x-full"
							enter-to="translate-x-0"
							leave="transition ease-in-out duration-300 transform"
							leave-from="translate-x-0"
							leave-to="translate-x-full"
						>
							<DialogPanel class="relative ml-auto">
								<ModelsSidebar />
							</DialogPanel>
						</TransitionChild>
					</div>
				</Dialog>
			</TransitionRoot>
		</template>
	</div>
</template>
