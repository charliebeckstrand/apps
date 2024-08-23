<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { useLayoutStore } from '@/stores/layout'

import type { Conversation } from '@/types/conversation'

const layoutStore = useLayoutStore()

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

	layoutStore.modelsSidebar.open = true
}
</script>

<template>
	<div
		class="conversation-model ml-[1px] line-clamp-1 inline-flex cursor-pointer items-center space-x-1 text-base font-extrabold leading-tight focus:outline-none focus-visible:text-blue-500"
		:tabindex="props.allowUpdate ? 0 : -1"
		@keydown.enter.prevent="toggleModelSidebar"
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
