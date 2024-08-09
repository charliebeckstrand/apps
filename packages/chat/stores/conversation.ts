import { defineStore } from 'pinia'

import { useRandom } from '@/composables/useRandom'

import type { Conversation } from '@/types/conversation'
import type { Message } from '@/types/message'

const { randomIdGenerator } = useRandom()

export const useConversationStore = defineStore('conversation', {
	state: (): {
		conversations: Conversation[]
		selectedConversation: Conversation | null
		loadingResponse: boolean
	} => ({
		conversations: [],
		selectedConversation: null,
		loadingResponse: false
	}),
	getters: {
		conversationStarted: (state) => {
			return state.selectedConversation?.messages && state.selectedConversation.messages.length > 1
		}
	},
	actions: {
		newConversation(conversation?: Conversation | null, model?: string) {
			if (conversation?.id) {
				this.conversations.push(conversation)
			} else {
				const conversation = {
					id: randomIdGenerator(),
					model: model || 'gpt-3.5-turbo',
					name: null,
					messages: [
						{
							value: 'Hello, how can I help you?',
							type: 'bot',
							createdAt: new Date()
						} as Message
					],
					createdAt: new Date()
				}
				this.conversations.push(conversation)
				this.selectedConversation = conversation
			}
		},
		addConversation(conversation: Conversation) {
			this.conversations.push(conversation)
		},
		removeConversation(conversation: Conversation) {
			const index = this.conversations.findIndex((c) => c.id === conversation.id)

			// If the conversation doesn't exist, return
			if (index === -1) return

			this.conversations.splice(index, 1)

			// If the removed conversation was the selected one, update the selection
			if (this.selectedConversation?.id === conversation.id) {
				this.selectedConversation =
					this.conversations[index] || this.conversations[this.conversations.length - 1] || null
			}
		},
		addMessage(message: Message) {
			if (this.selectedConversation?.id) {
				this.selectedConversation.messages.push({
					value: message.value,
					type: message.type,
					createdAt: new Date()
				})
			}
		}
	}
})
