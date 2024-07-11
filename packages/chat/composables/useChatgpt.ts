// composables/useChatgpt.ts
import axios from 'axios'

import type { Conversation } from '@/types/conversation'

interface ChatgptComposable {
	sendMessage: (
		userMessage: string,
		conversation: Conversation
	) => Promise<{ error: Error | null; data: { reply: string } | null }>
	generateName: (userMessage: string) => Promise<{ error: Error | null; conversationName: string | null }>
}

const handleResponse = async <T>(
	url: string,
	userMessage: string,
	conversation?: Conversation
): Promise<{ error: Error | null; data: T | null }> => {
	try {
		const response = await axios.post<T>(url, { message: userMessage, conversation })
		if (response.data) {
			return { error: null, data: response.data }
		}
		return { error: new Error('No data returned'), data: null }
	} catch (error: any) {
		console.error(error)
		return { error, data: null }
	}
}

export const useChatgpt = (): ChatgptComposable => {
	const sendMessage = (userMessage: string, conversation: Conversation) =>
		handleResponse<{ reply: string }>('http://localhost:4000/chat', userMessage, conversation)

	const generateName = async (
		userMessage: string
	): Promise<{ error: Error | null; conversationName: string | null }> => {
		const result = await handleResponse<{ conversationName: string }>(
			'http://localhost:4000/generate-name',
			userMessage
		)
		return { error: result.error, conversationName: result.data?.conversationName || null }
	}

	return { sendMessage, generateName }
}
