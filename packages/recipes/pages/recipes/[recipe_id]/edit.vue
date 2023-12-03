<script setup lang="ts">
import { useRoute } from 'vue-router'

import { useRecipesStore } from '@/stores/recipes'

import { CheckIcon, BackspaceIcon } from '@heroicons/vue/24/solid'

import type { Recipe } from '@/types/recipe'

const route = useRoute()
const router = useRouter()

const recipesStore = useRecipesStore()

const originalRecipe = ref<Recipe>({} as Recipe)
const editableRecipe = ref<Recipe>({} as Recipe)

originalRecipe.value = JSON.parse(
	JSON.stringify(recipesStore.recipes.find((recipe) => recipe.id === Number(route.params.recipe_id)))
)
editableRecipe.value = JSON.parse(JSON.stringify(originalRecipe.value))

const differencesBetweenRecipes = (recipe1: any, recipe2: any) => {
	const differences = {} as any

	for (const key in recipe1) {
		if (typeof recipe1[key] === 'object') {
			if (Array.isArray(recipe1[key])) {
				if (recipe1[key].length !== recipe2[key].length) {
					differences[key] = recipe2[key]
				} else {
					for (const index in recipe1[key]) {
						if (JSON.stringify(recipe1[key][index]) !== JSON.stringify(recipe2[key][index])) {
							differences[key] = recipe2[key]
						}
					}
				}
			} else {
				if (JSON.stringify(recipe1[key]) !== JSON.stringify(recipe2[key])) {
					differences[key] = recipe2[key]
				}
			}
		} else {
			if (recipe1[key] !== recipe2[key]) {
				differences[key] = recipe2[key]
			}
		}
	}

	for (const key in recipe2) {
		if (!(key in recipe1) && recipe2[key] !== '' && recipe2[key] !== null && recipe2[key] !== undefined) {
			differences[key] = recipe2[key]
		}
	}

	return differences
}

const isDifferences = computed(() => {
	return Object.keys(differencesBetweenRecipes(originalRecipe.value, editableRecipe.value)).length > 0
})

const saveChanges = () => {
	recipesStore.updateRecipe(editableRecipe.value)

	// if there is a router.back method, use it, otherwise navigate to the recipe page
	if (router.back) {
		router.back()
	} else {
		navigateTo(`/recipes/${editableRecipe.value.id}`)
	}
}

const confirmDiscardChangesRef = ref() as Ref<HTMLDivElement>
const showConfirmDiscardChanges = ref(false)

const discardChanges = () => {
	showConfirmDiscardChanges.value = true

	nextTick(() => {
		confirmDiscardChangesRef.value?.focus()
	})
}

onUnmounted(() => {
	// if there are differences, set the recipe to the original recipe
	editableRecipe.value = JSON.parse(JSON.stringify(originalRecipe.value))
})

useHead({
	title: editableRecipe.value ? `Edit: ${editableRecipe.value.name}` : 'Recipe not found'
})
</script>
<template>
	<div>
		<UIBreadcrumbs
			:items="[
				{ label: 'Home', to: '/' },
				{ label: 'Recipes', to: '/recipes' },
				{ label: `${originalRecipe.name}`, to: `/recipes/${editableRecipe.id}` },
				{ label: 'Edit', disabled: true }
			]"
		/>

		<UIPageHeader>
			<template #title>
				<span class="font-normal">Edit:</span>
				{{ originalRecipe.name }}
			</template>
		</UIPageHeader>

		<UIPageContent>
			<RecipeForm v-model="editableRecipe" />
		</UIPageContent>

		<UIPageFooter>
			<UIButton
				color="info"
				@click="saveChanges"
			>
				<template #prepend>
					<UIIcon :icon="CheckIcon" />
				</template>
				Save Changes
			</UIButton>

			<UIButton
				v-if="isDifferences"
				color="danger"
				variant="plain"
				@click="discardChanges"
			>
				<template #prepend>
					<UIIcon :icon="BackspaceIcon" />
				</template>
				Discard Changes
			</UIButton>
		</UIPageFooter>

		<div
			v-show="showConfirmDiscardChanges"
			ref="confirmDiscardChangesRef"
			class="relative"
			@keydown.esc="showConfirmDiscardChanges = false"
		>
			<div
				class="bg-primary/75 fixed inset-0 z-40"
				@click="showConfirmDiscardChanges = false"
			/>
			<div class="fixed inset-0 z-50 flex items-center justify-center">
				<div
					class="flex max-w-[500px] flex-col items-center justify-center space-y-5 rounded-lg bg-white p-10 text-center"
				>
					<div class="text-xl font-bold">Are you sure you want to discard changes?</div>
					<div class="flex items-center">
						<UIButton
							color="danger"
							variant="tonal"
							@click="navigateTo(`/recipes/${editableRecipe.id}`)"
						>
							<template #prepend>
								<UIIcon :icon="BackspaceIcon" />
							</template>
							Yes, Discard Changes
						</UIButton>
						<UIButton
							color="primary"
							variant="plain"
							@click="showConfirmDiscardChanges = false"
						>
							Cancel
						</UIButton>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
