import { defineStore } from 'pinia'

import type { Model } from '@/types/model'

export const useModelStore = defineStore('models', {
	state: (): {
		models: Model[]
		selectedModel: Model | undefined
	} => ({
		models: [],
		selectedModel: undefined
	}),
	actions: {}
})
