<script setup lang="ts">
import { MagnifyingGlassIcon, PlusIcon, XMarkIcon } from '@heroicons/vue/24/solid'
import { useLayoutStore } from '@/stores/layout'
import { useModelStore } from '@/stores/model'

const layoutStore = useLayoutStore()
const modelStore = useModelStore()

const searchInput = ref<HTMLInputElement | null>(null)
const searching = ref(false)
const searchTerm = ref('')

const modelSelected = ref(false)

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

const createConversation = () => {
	layoutStore.modelsSidebarOpen = true
}
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
							v-tippy="{ content: 'Create conversation' }"
							icon
							variant="text"
							:disabled="!modelSelected"
							@click="createConversation"
						>
							<UIIcon :icon="PlusIcon" />
						</UIButton>
					</div>
				</template>
			</UIHeader>
		</template>

		<template #default>
			<ModelsList :search-term="searchTerm" />
		</template>
	</UISidebar>
</template>
