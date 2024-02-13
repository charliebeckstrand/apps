<script setup lang="ts">
import { isEqual, cloneDeep } from 'lodash'

import { useRoute } from 'vue-router'

import { useRecipesStore } from '@/stores/recipes'

import type { Recipe } from '@/types/recipe'

type ExtendedRecipe = Recipe & {
	[key: string]: any
}

const route = useRoute()
const router = useRouter()

const recipesStore = useRecipesStore()

const existingRecipe = computed(() => {
	return recipesStore.recipes
		? recipesStore.recipes.find((recipe) => recipe.id === Number(route.params.recipe_id))
		: ({} as Recipe)
})
const originalRecipe = ref<Recipe>({} as ExtendedRecipe)
const editableRecipe = ref<Recipe>({} as ExtendedRecipe)

originalRecipe.value = existingRecipe.value ? cloneDeep(existingRecipe.value) : ({} as ExtendedRecipe)
editableRecipe.value = originalRecipe.value ? originalRecipe.value : ({} as ExtendedRecipe)

const recipeExists = recipesStore.recipes.find((recipe) => recipe.id === editableRecipe.value.id)
const navigationDestination = recipeExists ? `/recipes/${editableRecipe.value.id}` : '/recipes'

const isEmptyArray = (value: any) => {
	return Array.isArray(value) && value.length === 0
}

const isEmptyString = (value: any) => {
	return typeof value === 'string' && value.trim() === ''
}

const preprocessRecipe = (recipe: ExtendedRecipe) => {
	const processValue = (value: any): any => {
		if (Array.isArray(value)) {
			return value
				.map((item) => processValue(item))
				.filter((item) => item != null && !(typeof item === 'object' && Object.keys(item).length === 0))
		} else if (value && typeof value === 'object') {
			const processedObject: { [key: string]: any } = {}
			for (const key in value) {
				const processedItem = processValue(value[key])
				if (
					processedItem != null &&
					!(typeof processedItem === 'object' && Object.keys(processedItem).length === 0)
				) {
					processedObject[key] = processedItem
				}
			}
			return processedObject
		} else if (!isEmptyString(value) && value != null) {
			return value
		}
		return null
	}

	return processValue(cloneDeep(recipe)) as ExtendedRecipe
}

const isDifferences = computed(() => {
	const preprocessedOriginal = preprocessRecipe(originalRecipe.value)
	const preprocessedEditable = preprocessRecipe(editableRecipe.value)

	return !isEqual(preprocessedOriginal, preprocessedEditable)
})

const saveChanges = () => {
	recipesStore.updateRecipe(editableRecipe.value)

	// if there is a router.back method and the recipe still exists, go back, otherwise navigate to the recipes page
	if (router.back && recipeExists) {
		router.back()
	} else {
		navigateTo(navigationDestination)
	}
}

const showConfirmDiscardChanges = ref(false)

const cancel = () => {
	if (!isDifferences.value) {
		navigateTo(navigationDestination)
		return
	}

	showConfirmDiscardChanges.value = true
}

const discardChanges = () => {
	navigateTo(navigationDestination)
}

onUnmounted(() => {
	// if there are differences, set the recipe to the original recipe
	if (isDifferences.value) {
		editableRecipe.value = originalRecipe.value
	}
})

useHead({
	title: editableRecipe.value
		? `Edit: ${editableRecipe.value.name ? editableRecipe.value.name : 'Untitled Recipe'}`
		: 'Recipe not found'
})
</script>
<template>
	<div>
		<UIBreadcrumbs
			:items="[
				{ label: 'Home', to: '/' },
				{ label: 'Recipes', to: '/recipes' },
				{
					label: `${originalRecipe.name ? originalRecipe.name : 'Untitled Recipe'}`,
					to: `/recipes/${editableRecipe.id}`
				},
				{ label: 'Edit', disabled: true }
			]"
		/>

		<UIPageHeader sticky>
			<template #title>
				<div class="flex items-center space-x-1">
					<span class="font-normal">Edit:</span>
					<template v-if="originalRecipe.name">
						<span>{{ originalRecipe.name }}</span>
					</template>
					<template v-else>
						<span class="text-gray-400">Untitled Recipe</span>
					</template>
				</div>
			</template>
		</UIPageHeader>

		<UIPageContent>
			<RecipeForm v-model="editableRecipe" />
		</UIPageContent>

		<UIPageFooter>
			<Button
				color="info"
				@click="saveChanges"
			>
				Save
			</Button>
			<Button
				color="primary"
				variant="text"
				@click="cancel"
			>
				Cancel
			</Button>
			<!-- <Button
				v-if="isDifferences"
				color="danger"
				variant="tonal"
				@click="discardChanges"
			>
				<template #prepend>
					<UIIcon :icon="BackspaceIcon" />
				</template>
				Discard Changes
			</Button> -->
		</UIPageFooter>

		<UIDialog v-model="showConfirmDiscardChanges">
			<div class="mb-4 mt-2 text-center text-lg">Are you sure you want to discard changes?</div>
			<template #actions>
				<div class="flex items-center justify-center space-x-2">
					<Button
						color="danger"
						variant="tonal"
						@click="discardChanges"
					>
						Discard Changes
					</Button>
					<Button
						color="primary"
						variant="text"
						@click="showConfirmDiscardChanges = false"
					>
						Cancel
					</Button>
				</div>
			</template>
		</UIDialog>
	</div>
</template>
