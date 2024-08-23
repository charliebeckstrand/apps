import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', {
	state: () => ({
		conversations: {} as Record<string, { message: string; files: any[] }>
	}),
	actions: {
		setMessage(conversationId: string, message: string) {
			if (!this.conversations[conversationId]) {
				this.conversations[conversationId] = { message: '', files: [] }
			}
			this.conversations[conversationId].message = message
		},
		clearMessage(conversationId: string) {
			if (this.conversations[conversationId]) {
				this.conversations[conversationId].message = ''
			}
		},
		setFiles(conversationId: string, files: any[]) {
			if (!this.conversations[conversationId]) {
				this.conversations[conversationId] = { message: '', files: [] }
			}
			this.conversations[conversationId].files = files
		},
		addFile(conversationId: string, file: any) {
			if (!this.conversations[conversationId]) {
				this.conversations[conversationId] = { message: '', files: [] }
			}
			this.conversations[conversationId].files.push(file)
		},
		removeFile(conversationId: string, fileName: string) {
			if (!this.conversations[conversationId]) return
			this.conversations[conversationId].files = this.conversations[conversationId].files.filter(
				(f) => f.name !== fileName
			)
		},
		clearFiles(conversationId: string) {
			if (this.conversations[conversationId]) {
				this.conversations[conversationId].files = []
			}
		}
	}
})
