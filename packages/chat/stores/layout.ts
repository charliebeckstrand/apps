import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
	state: () => ({
		conversationsSidebarOpen: false,
		modelsSidebarOpen: false
	}),
	actions: {}
})
