<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useModelStore } from '@/stores/model'

import type { Model } from '@/types/model'

const modelStore = useModelStore()

const props = defineProps<{
	model: Model
}>()

const { model } = toRefs(props)

const isActive = computed(() => modelStore.selectedModel === model.value)

const selectModel = (model: Model) => {
	modelStore.selectedModel = model
}

const modelName = (name: string | null) => {
	if (name?.includes('```')) {
		return name.replace(/```[\s\S]*?```/g, '')
	} else {
		return name
	}
}
</script>

<template>
	<UICard
		color="accent"
		variant="plain"
		:active="isActive"
		interactive
		:class="['model-card relative', { 'pointer-events-none': isActive }]"
		@click="selectModel"
	>
		<UIHeader>
			<template #title>
				<span class="line-clamp-1 leading-tight text-white">
					{{ modelName(model) }}
				</span>
			</template>
		</UIHeader>
	</UICard>
</template>

<style scoped lang="scss"></style>
