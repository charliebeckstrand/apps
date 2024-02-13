import type { Task } from './task'

export type Lane = {
	id: string
	name: string
	tasks?: Task[]
}
