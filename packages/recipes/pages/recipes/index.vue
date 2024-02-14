<script setup lang="ts">
import type { Recipe } from '@/types/recipe'

import { ref } from 'vue'

import { PlusIcon } from '@heroicons/vue/24/solid'

import { useAuthStore } from '@/stores/auth'
import { useRecipesStore } from '@/stores/recipes'

const authStore = useAuthStore()
const recipesStore = useRecipesStore()

const recipes = ref<Recipe[]>([])

const filter = ref<string>('')

const filteredRecipes = computed(() => {
	return recipes.value.filter((recipe: Recipe) => {
		// return recipe if name includes filter value or if no filter value
		return recipe.name ? recipe.name.toLowerCase().includes(filter.value.toLowerCase()) : false || !filter.value
	})
})

const recipesWithNames = computed(() => {
	return recipes.value.filter((recipe: Recipe) => recipe.name)
})

const loading = ref<boolean>(false)

loading.value = true

onMounted(() => {
	recipes.value = recipesStore.recipes

	loading.value = false
})
</script>
<template>
	<div class="h-full">
		<UIPageHeader>
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
		</UIPageHeader>
		<UIPageContent>
			<template v-if="loading"></template>
			<template v-else>
				<div class="w-[400px] space-y-4">
					<UICard>
						<template #title>Card Title</template>
						<template #default>Card Body</template>
					</UICard>

					<div>
						<UIPanel
							padding="sm"
							class="bg-primary/50 rounded-b-none text-white"
						>
							Card Title
						</UIPanel>
						<UIPanel class="rounded-t-none">Card Body</UIPanel>
					</div>
				</div>

				<template v-if="recipes.length">
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
		</UIPageContent>
	</div>
</template>
