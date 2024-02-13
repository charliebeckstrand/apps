import { defineStore } from 'pinia'

import type { Lane } from '@/types/lane'

export const useAppStore = defineStore('app', {
	state: () => ({
		lanes: [] as Lane[]
	}),
	actions: {
		setLanes(lanes: Lane[]) {
			this.lanes = lanes
		},
		addLane(lane: Lane) {
			this.lanes.push(lane)
		},
		removeLane(lane: Lane) {
			this.lanes = this.lanes.filter((l) => l !== lane)
		}
	}
})
