import { defineStore } from 'pinia'

import type { Recipe } from '@/types/recipe'

export const useRecipesStore = defineStore('recipes', {
	state: () => ({
		recipes: [] as Recipe[]
	}),
	actions: {
		addRecipe(recipe: Recipe) {
			this.recipes.push(recipe)
		},
		updateRecipe(recipe: Recipe) {
			const index = this.recipes.findIndex((r) => r.id === recipe.id)
			if (index !== -1) {
				this.recipes.splice(index, 1, recipe)
			}
		},
		removeRecipe(recipe: Recipe) {
			this.recipes.splice(this.recipes.indexOf(recipe), 1)
		}
	}
})
