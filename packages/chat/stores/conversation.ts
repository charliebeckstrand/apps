import { defineStore } from 'pinia'

import { useRandom } from '@/composables/useRandom'

import type { Conversation } from '@/types/conversation'
import type { Message } from '@/types/message'

const { randomIdGenerator, randomNameGenerator } = useRandom()

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
	actions: {
		newConversation(conversation?: Conversation) {
			if (conversation?.id) {
				this.conversations.push(conversation)
			} else {
				const conversation = {
					id: randomIdGenerator(),
					name: randomNameGenerator(),
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
		selectConversation(conversation: Conversation) {
			this.selectedConversation = conversation
		},
		removeConversation(conversation: Conversation) {
			const index = this.conversations.findIndex((c) => c.id === conversation.id)

			if (index > -1) {
				this.conversations.splice(index, 1)
			}

			const nextConversation = this.conversations[index] || this.conversations[index - 1]

			if (nextConversation) {
				this.selectedConversation = nextConversation
			} else {
				this.selectedConversation = null
			}

			// if (this.selectedConversation?.id === conversation.id) {
			// 	this.selectedConversation = null
			// }
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