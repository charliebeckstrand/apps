import { defineStore } from 'pinia'

import type { Recipe } from '@/types/recipe'

export const useRecipesStore = defineStore('recipes', {
	state: () => ({
		recipes: [] as Recipe[]
	}),
	getters: {
		getRecipeById: (state) => (id: number) => state.recipes.find((recipe) => recipe.id === id)
	},
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
		deleteRecipe(recipe: Recipe) {
			return new Promise((resolve, reject) => {
				if (confirm('Are you sure you want to delete this recipe?')) {
					this.recipes.splice(this.recipes.indexOf(recipe), 1)
					resolve(true)
				} else {
					reject(false)
				}
			})
		}
	}
})
