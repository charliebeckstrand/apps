<script setup lang="ts">
import { useRoute } from 'vue-router'

import { useRecipesStore } from '@/stores/recipes'

import { HeartIcon, NoSymbolIcon } from '@heroicons/vue/24/outline'
import { ChevronRightIcon, ChevronDownIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/solid'

import type { Recipe } from '@/types/recipe'

const route = useRoute()

const recipesStore = useRecipesStore()

const recipe = ref<Recipe>({} as Recipe)

recipe.value = recipesStore.recipes.find((recipe) => recipe.id === Number(route.params.recipe_id)) as Recipe

const timeToRelative = (time: number) => {
	if (time < 60) {
		return `${time} minutes`
	}

	const hours = Math.floor(time / 60)
	const minutes = time % 60

	return `${hours} hours and ${minutes} minutes`
}

const descriptionRef = ref() as Ref<HTMLDivElement>

const isHeaderSticky = ref(false)
const isTruncated = ref(false)

const updateIsTruncated = () => {
	if (!descriptionRef.value) {
		return false
	}

	showDescription.value = false

	isTruncated.value = descriptionRef.value.scrollHeight > descriptionRef.value.clientHeight
}

const showDescription = ref(false)

const scrolledToTop = ref()

const handleScroll = () => {
	scrolledToTop.value = window.scrollY > 80 + 52
}

if (process.client) {
	document.addEventListener('scroll', handleScroll)
}

const ingredients = computed(() => {
	if (!recipe.value.ingredients) {
		return []
	}

	return recipe.value.ingredients.filter((ingredient) => {
		return ingredient.name
	})
})

const instructions = computed(() => {
	if (!recipe.value.instructions) {
		return []
	}

	return recipe.value.instructions.filter((instruction) => {
		return instruction.description
	})
})

onMounted(() => {
	window.addEventListener('resize', updateIsTruncated)
	updateIsTruncated()
})

onBeforeUnmount(() => {
	window.removeEventListener('resize', updateIsTruncated)
})

useHead({
	title: recipe.value?.name || 'Recipe not found'
})
</script>
<template>
	<div>
		<template v-if="recipe">
			<UIBreadcrumbs
				:items="[
					{ label: 'Home', to: '/' },
					{ label: 'Recipes', to: '/recipes' },
					{ label: `${recipe.name}`, disabled: true }
				]"
			/>

			<UIPageHeader
				:sticky="isHeaderSticky"
				:class="isHeaderSticky && scrolledToTop ? 'border-b' : ''"
			>
				<template #prepend>
					<UIThumbnail
						v-if="recipe.thumbnail"
						:src="recipe.thumbnail"
						height="96"
						width="96"
						rounded="lg"
					/>
				</template>

				<template #title>{{ recipe.name }}</template>
				<template #subtitle>
					<div
						ref="descriptionRef"
						class="mb-2"
						:class="{ 'line-clamp-2': !showDescription }"
					>
						{{ recipe.description }}
					</div>
					<UIButton
						v-if="isTruncated"
						color="info"
						variant="plain"
						size="sm"
						class="px-0"
						@click="showDescription = !showDescription"
					>
						{{ showDescription ? 'Show Less' : 'Show More' }}

						<template #append>
							<UIIcon
								:icon="showDescription ? ChevronRightIcon : ChevronDownIcon"
								size="xs"
							/>
						</template>
					</UIButton>
				</template>
				<template #misc>
					<div class="flex items-center space-x-1">
						<UIButton
							color="pink"
							:variant="recipe.favorite ? 'default' : 'tonal'"
							size="sm"
							@click="recipe.favorite = !recipe.favorite"
						>
							<template #prepend>
								<UIIcon
									:icon="recipe.favorite ? NoSymbolIcon : HeartIcon"
									size="xs"
								/>
							</template>

							{{ recipe.favorite ? 'Unfavorite' : 'Favorite' }}
						</UIButton>
						<UIButton
							color="info"
							variant="tonal"
							size="sm"
							:to="`/recipes/${recipe.id}/edit`"
						>
							<template #prepend>
								<UIIcon
									:icon="PencilIcon"
									size="xs"
								/>
							</template>
							Edit
						</UIButton>

						<UIButton
							color="danger"
							variant="tonal"
							size="sm"
						>
							<template #prepend>
								<UIIcon
									:icon="TrashIcon"
									size="xs"
								/>
							</template>
							Delete
						</UIButton>
					</div>
				</template>
			</UIPageHeader>

			<UIPageContent>
				<section id="ingredients">
					<UIHeader>
						<template #title>Ingredients</template>
					</UIHeader>

					<div v-if="ingredients.length">
						<div
							v-for="(ingredient, index) in ingredients"
							:key="index"
							class="flex items-center space-x-5 border-l border-r border-t p-5 first:rounded-t last:rounded-b last:border-b"
						>
							<div>{{ ingredient.name }}</div>
							<UIBadge
								v-if="ingredient.quantity || ingredient.unit"
								color="primary"
								variant="outlined"
							>
								{{ ingredient.quantity }} {{ ingredient.unit }}
							</UIBadge>
						</div>
					</div>
					<UIAlert
						v-else
						color="warning"
						variant="tonal"
					>
						No ingredients added
					</UIAlert>
				</section>

				<section id="instructions">
					<UIHeader>
						<template #title>Instructions</template>
					</UIHeader>

					<div v-if="instructions.length">
						<div
							v-for="(instruction, index) in instructions"
							:key="index"
							class="flex items-center space-x-5 border-l border-r border-t p-5 first:rounded-t last:rounded-b last:border-b"
						>
							<div>{{ index + 1 }}.</div>
							<div>{{ instruction.description }}</div>
						</div>
					</div>
					<UIAlert
						v-else
						color="warning"
						variant="tonal"
					>
						No instructions added
					</UIAlert>
				</section>

				<section
					v-if="recipe.notes"
					id="notes"
					class="pb-3"
				>
					<UIHeader>
						<template #title>Notes</template>
					</UIHeader>

					<div>{{ recipe.notes }}</div>
				</section>
			</UIPageContent>

			<UIPageFooter v-if="recipe.prepTime || recipe.cookTime || recipe.servings">
				<div class="info mx-auto flex space-x-1 overflow-x-auto">
					<UIBadge
						color="primary"
						variant="outlined"
					>
						<UILabel>Prep:</UILabel>
						<div class="font-bold">{{ timeToRelative(recipe.prepTime) }}</div>
					</UIBadge>
					<UIBadge
						color="primary"
						variant="outlined"
					>
						<UILabel>Cook:</UILabel>
						<div class="font-bold">{{ timeToRelative(recipe.cookTime) }}</div>
					</UIBadge>
					<UIBadge
						color="primary"
						variant="outlined"
					>
						<UILabel>Total:</UILabel>
						<div class="font-bold">{{ timeToRelative(recipe.prepTime + recipe.cookTime) }}</div>
					</UIBadge>
					<UIBadge
						color="primary"
						variant="outlined"
					>
						<UILabel>Servings:</UILabel>
						<div class="font-bold">{{ recipe.servings }}</div>
					</UIBadge>
				</div>
			</UIPageFooter>
		</template>
		<UIPageContent v-else>
			<UIAlert
				color="danger"
				variant="tonal"
			>
				Recipe not found
			</UIAlert>
		</UIPageContent>
	</div>
</template>

<style scoped lang="scss">
section {
	@apply space-y-5;
}

.info {
	:deep(.ui-badge) {
		@apply flex items-center space-x-1 whitespace-nowrap;
		// @apply flex items-center space-x-1 whitespace-nowrap;
	}
}
</style>
