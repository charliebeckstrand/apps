<script setup lang="ts">
import { useLayoutStore } from '@/stores/layout'
import { useModelStore } from '@/stores/model'

import type { Model } from '@/types/model'

const layoutStore = useLayoutStore()
const modelStore = useModelStore()

const props = defineProps<{
	searchTerm: string
}>()

const sortedModels = computed(() => {
	return modelStore.models.sort((a: any, b: any) => {
		return b.createdAt - a.createdAt
	})
})

const filteredModels = computed(() => {
	const { value: models } = sortedModels

	if (props.searchTerm) {
		const searchTerm = props.searchTerm.toLowerCase()

		return models?.filter((model: any) => {
			const name = model ? model.toLowerCase() : ''

			return name.includes(searchTerm)
		})
	}

	return models
})

const selectModel = (model: Model) => {
	modelStore.selectedModel = model
	layoutStore.modelsSidebarOpen = false
}

onMounted(() => {
	modelStore.models = ['gpt-3.5-turbo', 'gpt-4']
})
</script>

<template>
	<div class="space-y-2">
		<template v-if="sortedModels.length > 0">
			<ModelsListCard
				v-for="(model, index) in filteredModels"
				:key="index"
				:model="model"
				@click="selectModel(model)"
			>
				{{ model }}
			</ModelsListCard>
		</template>
		<template v-if="props.searchTerm && !filteredModels.length">
			<UIAlert
				color="warning"
				text-color="white"
				variant="tonal"
			>
				No models match your search term
			</UIAlert>
		</template>
		<template v-else-if="!props.searchTerm && !filteredModels.length">
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
