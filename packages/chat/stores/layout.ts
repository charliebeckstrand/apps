import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
	state: () => ({
		sidebarOpen: false
	}),
	actions: {
		toggleSidebar() {
			this.sidebarOpen = !this.sidebarOpen
		}
	}
})
