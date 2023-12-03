import type { Ingredient } from './ingredient'
import type { Instruction } from './instruction'

interface Recipe {
	id: number
	name: string
	description: string
	thumbnail?: string
	prepTime: number
	cookTime: number
	servings: number
	ingredients: Ingredient[]
	instructions: Instruction[]
	notes?: string
	favorite?: boolean
}

export type { Recipe }
