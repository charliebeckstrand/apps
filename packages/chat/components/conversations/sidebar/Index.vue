<script setup lang="ts">
import { PlusIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/24/outline'

import { useConversationStore } from '@/stores/conversation'

const conversationStore = useConversationStore()

const searchInput = ref<HTMLInputElement | null>(null)
const searching = ref(false)
const searchTerm = ref('')

const setRef = (component: any) => {
	if (component?.$el) {
		// Set the input element
		searchInput.value = component.$el as HTMLInputElement

		// Focus the input
		searchInput.value?.focus()
	}
}

const searchConversations = () => {
	searching.value = true
}

const cancelSearch = () => {
	searching.value = false
	searchTerm.value = ''
}

const cancelSearchIfNoValue = () => {
	if (!searchTerm.value) {
		cancelSearch()
	}
}
</script>

<template>
	<UISidebar>
		<template #prepend>
			<UIHeader class="h-[4.5rem] min-h-[4.5rem] text-white">
				<template #title>
					<template v-if="searching">
						<UIFormInput
							:ref="setRef"
							v-model="searchTerm"
							class="bg-transparent px-0 text-lg placeholder:text-gray-300 focus:outline-none focus:ring-0"
							:class="{ 'font-bold': searchTerm.length, 'font-normal': !searchTerm.length }"
							placeholder="Search..."
							@blur="cancelSearchIfNoValue"
						/>
					</template>
					<template v-else>Conversations</template>
				</template>
				<template #append>
					<template v-if="searching">
						<UIButton
							v-tippy="{ content: 'Cancel search' }"
							color="white"
							variant="text"
							icon
							dark
							@click="cancelSearch"
						>
							<UIIcon :icon="XMarkIcon" />
						</UIButton>
					</template>
					<div
						v-else
						class="flex items-center"
					>
						<UIButton
							v-if="conversationStore.conversations.length"
							v-tippy="{ content: 'Search conversations' }"
							color="white"
							variant="text"
							icon
							dark
							@click="searchConversations"
						>
							<UIIcon :icon="MagnifyingGlassIcon" />
						</UIButton>

						<UIButton
							v-tippy="{ content: 'New conversation' }"
							color="white"
							variant="text"
							icon
							dark
							@click="conversationStore.newConversation"
						>
							<UIIcon :icon="PlusIcon" />
						</UIButton>
					</div>
				</template>
			</UIHeader>
		</template>

		<template #default>
			<ConversationsList :search-term="searchTerm" />
		</template>
	</UISidebar>
</template>
