import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
	state: () => ({
		conversationsSidebar: {
			open: false
		},
		modelsSidebar: {
			open: false,
			newConversation: false
		}
	}),
	actions: {}
})
