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
	<PageLayout>
		<template #breadcrumbs>
			<UIBreadcrumbs
				:items="[
					{ label: 'Home', to: '/' },
					{ label: 'Recipes', to: '/recipes' },
					{ label: 'Create', disabled: true }
				]"
			/>
		</template>

		<template #header>
			<Header>
				<template #title>Create Recipe</template>
			</Header>
		</template>

		<template #default>
			<RecipeForm v-model="editableRecipe" />
		</template>

		<template #footer>
			<Button
				color="success"
				@click="createRecipe"
			>
				<template #prepend>
					<UIIcon :icon="PlusIcon" />
				</template>
				Create
			</Button>
		</template>
	</PageLayout>
</template>
