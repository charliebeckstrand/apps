<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline'

import { useConversationStore } from '@/stores/conversation'
import { useLayoutStore } from '@/stores/layout'

import type { Conversation } from '@/types/conversation'

const conversationStore = useConversationStore()
const layoutStore = useLayoutStore()

const props = defineProps<{
	conversation: Conversation
}>()

const selectConversation = () => {
	conversationStore.selectConversation(props.conversation)

	layoutStore.sidebarOpen = false
}

const removeConversation = (conversation: Conversation) => {
	console.log('remove')
	conversationStore.removeConversation(conversation)
}
</script>

<template>
	<UICard
		variant="plain"
		color="accent"
		class="card cursor-pointer"
		:active="conversationStore.selectedConversation?.id === props.conversation.id"
		interactive
		@click="selectConversation"
	>
		<div class="flex items-center justify-between">
			<div>
				<UIHeader>
					<template #title>
						<span class="line-clamp-1 leading-tight">{{ props.conversation.name }}</span>
					</template>
					<template #subtitle>
						<span class="line-clamp-1 text-gray-400">{{ props.conversation.id }}</span>
					</template>
				</UIHeader>

				<span
					v-if="props.conversation.messages.length"
					class="line-clamp-1 text-gray-300"
				>
					{{ props.conversation.messages[conversation.messages.length - 1].value }}
				</span>
			</div>
			<div class="remove">
				<UIButton
					icon
					color="white"
					variant="text"
					@click.stop="removeConversation(props.conversation)"
				>
					<UIIcon :icon="XMarkIcon" />
				</UIButton>
			</div>
		</div>
	</UICard>
</template>

<style scoped lang="scss">
.card {
	.remove {
		display: none;
	}

	&:hover {
		.remove {
			display: block;
		}
	}
}
</style>
