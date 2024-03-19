import type { Message } from './message'

export interface Conversation {
	id: string
	model: string
	name: string | null
	messages: Message[]
	createdAt: Date
}
