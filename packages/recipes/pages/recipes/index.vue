<script setup lang="ts">
import type { Recipe } from '@/types/recipe'

import { ref } from 'vue'

import { PlusIcon } from '@heroicons/vue/24/solid'

import { useAuthStore } from '@/stores/auth'
import { useRecipesStore } from '@/stores/recipes'

const authStore = useAuthStore()
const recipesStore = useRecipesStore()

const filter = ref<string>('')

const filteredRecipes = computed(() =>
	recipesStore.recipes.filter(
		(recipe: Recipe) => !filter.value || recipe.name?.toLowerCase().includes(filter.value.toLowerCase())
	)
)

const recipesWithNames = computed(() => {
	return recipesStore.recipes.filter((recipe: Recipe) => recipe.name)
})

const deleteRecipe = async (recipe: Recipe) => {
	try {
		await recipesStore.deleteRecipe(recipe)
	} catch (_) {}
}
</script>
<template>
	<PageLayout>
		<template #header>
			<Header>
				<template #title>Recipes</template>
				<template #append>
					<Button
						v-if="authStore.user?.id"
						to="/create"
						color="success"
						variant="tonal"
					>
						<template #prepend>
							<UIIcon :icon="PlusIcon" />
						</template>
						Create Recipe
					</Button>
				</template>
			</Header>
		</template>

		<template #default>
			<template v-if="recipesStore.recipes.length">
				<UIFormInput
					v-if="recipesWithNames.length"
					v-model="filter"
					placeholder="Search"
				/>

				<template v-if="filteredRecipes.length">
					<div class="space-y-2">
						<RecipeCard
							v-for="(recipe, index) in filteredRecipes"
							:key="index"
							:recipe="recipe"
							@delete="deleteRecipe"
						/>
					</div>
				</template>

				<UIAlert
					v-else
					color="warning"
					variant="tonal"
				>
					No recipes found
				</UIAlert>
			</template>
			<UIAlert
				v-else
				color="danger"
				variant="tonal"
			>
				No recipes added
			</UIAlert>
		</template>
	</PageLayout>
</template>
