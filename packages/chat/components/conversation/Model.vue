<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { useLayoutStore } from '@/stores/layout'
import { useModelStore } from '@/stores/model'

import type { Conversation } from '@/types/conversation'

const layoutStore = useLayoutStore()
const modelStore = useModelStore()

const props = withDefaults(
	defineProps<{
		conversation: Conversation
		allowUpdate?: boolean
	}>(),
	{
		conversation: undefined,
		allowUpdate: true
	}
)

const toggleModelSidebar = () => {
	if (props.allowUpdate === false) return

	modelStore.selectedModel = props.conversation.model
	layoutStore.modelsSidebarOpen = true
}
</script>

<template>
	<div
		class="conversation-model line-clamp-1 inline-flex cursor-pointer items-center space-x-1 text-base font-extrabold leading-tight"
		@click="toggleModelSidebar"
	>
		<div>
			{{ conversation?.model }}
		</div>
		<div
			v-if="props.allowUpdate"
			class="chevron-icon"
		>
			<ChevronDownIcon class="size-4" />
		</div>
	</div>
</template>
