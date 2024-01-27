import type { Message } from './message'

export interface Conversation {
	id: string
	name: string
	messages: Message[]
	createdAt: Date
}
