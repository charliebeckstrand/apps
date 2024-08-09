<script setup lang="ts">
import type { Model } from '@/types/model'

const props = defineProps<{
	model: Model
	active: boolean
}>()

const { model } = toRefs(props)

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
		:active="active"
		interactive
		:class="['model-card relative select-none', { 'pointer-events-none': active }]"
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
