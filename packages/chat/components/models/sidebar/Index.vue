<script setup lang="ts">
import { MagnifyingGlassIcon, PlusIcon, XMarkIcon } from '@heroicons/vue/24/solid'
import { useConversationStore } from '@/stores/conversation'
import { useLayoutStore } from '@/stores/layout'
import { useModelStore } from '@/stores/model'

import type { Model } from '@/types/model'

const conversationStore = useConversationStore()
const layoutStore = useLayoutStore()
const modelStore = useModelStore()

const { conversationStarted } = conversationStore

const showErrorMessage = ref(false)

const searchInput = ref<HTMLInputElement | null>(null)
const searching = ref(false)
const searchTerm = ref('')

const selectedModel = ref<Model | undefined>(undefined)
const sortedModels = computed(() => {
	const models = [...modelStore.models]
	return models.sort((a: any, b: any) => b.createdAt - a.createdAt)
})
const filteredModels = computed(() => {
	const { value: models } = sortedModels

	if (searchTerm.value) {
		const term = searchTerm.value.toLowerCase()

		return models?.filter((model: any) => {
			const name = model ? model.toLowerCase() : ''

			return name.includes(term)
		})
	}

	return models
})

const selectModel = (model: Model) => {
	if (layoutStore.modelsSidebar.newConversation) {
		selectedModel.value = model
	} else {
		if (conversationStore.selectedConversation) {
			conversationStore.selectedConversation.model = model

			layoutStore.modelsSidebar.open = false
		}
	}
}

const searchModels = () => {
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

const createConversation = () => {
	if (!selectedModel.value) {
		showErrorMessage.value = true
		return
	}

	conversationStore.newConversation(null, selectedModel.value)
	layoutStore.modelsSidebar.open = false

	nextTick(() => {
		layoutStore.modelsSidebar.newConversation = false
	})
}

onMounted(() => {
	modelStore.models = ['gpt-3.5-turbo', 'gpt-4', 'gpt-4o']

	if (!layoutStore.modelsSidebar.newConversation) {
		selectedModel.value = conversationStore.selectedConversation?.model
	}
})

onBeforeUnmount(() => (layoutStore.modelsSidebar.newConversation = false))
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
					Models
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
							v-if="modelStore.models?.length"
							v-tippy="{ content: 'Search models' }"
							icon
							variant="text"
							dark
							@click="searchModels"
						>
							<UIIcon :icon="MagnifyingGlassIcon" />
						</UIButton>
						<UIButton
							v-if="layoutStore.modelsSidebar.newConversation"
							v-tippy="{ content: 'Create conversation' }"
							icon
							variant="text"
							dark
							:class="{ 'cursor-auto': !selectedModel }"
							@click="createConversation"
						>
							<UIIcon :icon="PlusIcon" />
						</UIButton>
					</div>
				</template>
			</UIHeader>
		</template>

		<template #default>
			<div class="space-y-2">
				<UIAlert
					v-if="showErrorMessage && !selectedModel"
					color="danger"
					variant="tonal"
				>
					Please select a model
				</UIAlert>
				<template v-if="sortedModels.length > 0">
					<ModelsSidebarCard
						v-for="(model, index) in filteredModels"
						:key="index"
						:model="model"
						:active="model === selectedModel"
						:class="[
							,
							'border border-transparent focus:outline-none focus-visible:border-blue-500',
							{
								'pointer-events-none opacity-50':
									!layoutStore.modelsSidebar.newConversation && conversationStarted
							}
						]"
						:tabindex="!layoutStore.modelsSidebar.newConversation && conversationStarted ? -1 : 0"
						@click="selectModel(model)"
						@keydown.enter="selectModel(model)"
					/>
				</template>
				<template v-if="searchTerm && !filteredModels.length">
					<UIAlert
						color="warning"
						text-color="white"
						variant="tonal"
					>
						No models match your search term
					</UIAlert>
				</template>
				<template v-else-if="!searchTerm && !filteredModels.length">
					<UIAlert
						color="warning"
						text-color="white"
						variant="tonal"
						dark
					>
						No models available
					</UIAlert>
				</template>
			</div>
		</template>
	</UISidebar>
</template>
