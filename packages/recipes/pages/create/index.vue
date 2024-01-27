<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/solid'

import { useRecipesStore } from '@/stores/recipes'

import type { Recipe } from '@/types/recipe'

const recipesStore = useRecipesStore()

const editableRecipe = ref<Recipe>({} as Recipe)

const createRecipe = () => {
	recipesStore.addRecipe({
		...editableRecipe.value,
		id: recipesStore.recipes.length + 1
	})

	navigateTo('/recipes')
}
</script>
<template>
	<div>
		<UIBreadcrumbs
			:items="[
				{ label: 'Home', to: '/' },
				{ label: 'Recipes', to: '/recipes' },
				{ label: 'Create', disabled: true }
			]"
		/>

		<UIPageHeader sticky>
			<template #title>Create Recipe</template>
		</UIPageHeader>

		<UIPageContent>
			<RecipeForm v-model="editableRecipe" />
		</UIPageContent>

		<UIPageFooter>
			<Button
				color="success"
				@click="createRecipe"
			>
				<template #prepend>
					<UIIcon :icon="PlusIcon" />
				</template>
				Create
			</Button>
		</UIPageFooter>
	</div>
</template>
