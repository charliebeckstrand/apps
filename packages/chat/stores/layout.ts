import { defineStore } from 'pinia'

type ModelsSidebar = {
	open: boolean
	newConversation: boolean
}
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
