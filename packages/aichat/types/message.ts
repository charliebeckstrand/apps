export interface Message {
	type: 'system' | 'bot' | 'user'
	value: string
	createdAt?: Date
}
