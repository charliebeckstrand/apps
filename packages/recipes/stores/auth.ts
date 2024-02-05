import { defineStore } from 'pinia'

import type { User } from '@/types/user'

export const useAuthStore = defineStore('auth', {
	state: () => ({
		user: {} as User | null
	}),
	actions: {
		setUser(user: User | null) {
			this.user = user
		}
	}
})
