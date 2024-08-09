<script setup lang="ts">
import { PlusIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/24/outline'

import { useConversationStore } from '@/stores/conversation'

const conversationStore = useConversationStore()

const searchInput = ref<HTMLInputElement | null>(null)
const searching = ref(false)
const searchTerm = ref('')

const searchConversations = () => {
	searching.value = true
	nextTick(() => {
		searchInput.value?.focus()
	})
}

const cancelSearch = () => {
	searching.value = false
	searchTerm.value = ''
}

const cancelEmptySearch = () => {
	if (!searchTerm.value) {
		searching.value = false
	}
}

watch(conversationStore.conversations, (conversations) => {
	// If searching and the last conversation is removed, set searching to false
	if (!conversations.length) {
		searching.value = false
	}
})
</script>

<template>
	<UISidebar>
		<template #prepend>
			<UIHeader class="h-[4.5rem] min-h-[4.5rem] text-white">
				<template
					v-if="searching"
					#prepend
				>
					<UIFormInput
						ref="searchInput"
						v-model="searchTerm"
						:class="[
							'bg-transparent px-0 text-lg placeholder:text-gray-300 focus:outline-none focus:ring-0',
							{ 'font-bold': searchTerm.length, 'font-normal': !searchTerm.length }
						]"
						placeholder="Search..."
						@keydown.esc="cancelSearch"
						@blur="cancelEmptySearch"
					/>
				</template>
				<template
					v-else
					#title
				>
					Conversations
				</template>
				<template #append>
					<UIButton
						v-if="searching"
						v-tippy="{ content: 'Cancel search' }"
						icon
						variant="text"
						dark
						@click="cancelSearch"
					>
						<UIIcon :icon="XMarkIcon" />
					</UIButton>
					<div
						v-else
						class="flex items-center"
					>
						<UIButton
							v-if="conversationStore.conversations.length"
							v-tippy="{ content: 'Search conversations' }"
							icon
							variant="text"
							dark
							@click="searchConversations"
						>
							<UIIcon :icon="MagnifyingGlassIcon" />
						</UIButton>
						<UIButton
							v-tippy="{ content: 'New conversation' }"
							icon
							variant="text"
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
