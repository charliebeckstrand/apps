<script setup lang="ts">
import { useRoute } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import { useRecipesStore } from '@/stores/recipes'

import { HeartIcon, NoSymbolIcon } from '@heroicons/vue/24/outline'
import { ChevronRightIcon, ChevronDownIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/solid'

import type { Recipe } from '@/types/recipe'

const route = useRoute()

const authStore = useAuthStore()
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
		<PageLayout v-if="recipe">
			<template #breadcrumbs>
				<UIBreadcrumbs
					:items="[
						{ label: 'Home', to: '/' },
						{ label: 'Recipes', to: '/recipes' },
						{ label: `${recipe.name ? recipe.name : 'Untitled Recipe'}`, disabled: true }
					]"
				/>
			</template>

			<template #header>
				<Header>
					<template #prepend>
						<UIThumbnail
							v-if="recipe.thumbnail"
							:src="recipe.thumbnail"
							height="96"
							width="96"
							rounded="lg"
						/>
					</template>

					<template #title>
						<template v-if="recipe.name">
							{{ recipe.name }}
						</template>
						<template v-else>
							<span class="text-gray-400">Untitled Recipe</span>
						</template>
					</template>

					<template #default>
						<div
							v-if="recipe.description"
							class="mt-2 space-y-2 text-gray-500"
						>
							<div
								ref="descriptionRef"
								:class="{ 'line-clamp-2': !showDescription }"
							>
								{{ recipe.description }}
							</div>
							<Button
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
							</Button>
						</div>
						<div class="mt-4 flex items-center space-x-1">
							<Button
								color="pink"
								:variant="recipe.favorite ? 'default' : 'tonal'"
								@click="recipe.favorite = !recipe.favorite"
							>
								<template #prepend>
									<UIIcon :icon="recipe.favorite ? NoSymbolIcon : HeartIcon" />
								</template>

								{{ recipe.favorite ? 'Unfavorite' : 'Favorite' }}
							</Button>
							<Button
								v-if="authStore.user?.id"
								color="info"
								variant="tonal"
								:to="`/recipes/${recipe.id}/edit`"
							>
								<template #prepend>
									<UIIcon :icon="PencilIcon" />
								</template>
								Edit
							</Button>
							<Button
								v-if="authStore.user?.id"
								color="danger"
								variant="tonal"
							>
								<template #prepend>
									<UIIcon :icon="TrashIcon" />
								</template>
								Delete
							</Button>
						</div>
					</template>
				</Header>
			</template>

			<template #default>
				<section id="ingredients">
					<UIHeader>
						<template #title>Ingredients</template>
					</UIHeader>

					<div v-if="ingredients.length">
						<div
							v-for="(ingredient, index) in ingredients"
							:key="index"
							class="flex items-center space-x-3 border-l border-r border-t p-4 first:rounded-t last:rounded-b last:border-b"
						>
							<div>{{ ingredient.name }}</div>
							<UIBadge
								v-if="ingredient.quantity || ingredient.unit"
								color="primary"
								variant="outlined"
							>
								{{ ingredient.quantity }} {{ ingredient.unit?.label }}
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
							class="flex items-center space-x-3 border-l border-r border-t p-4 first:rounded-t last:rounded-b last:border-b"
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
			</template>

			<template #footer>
				<div
					v-if="recipe.prepTime || recipe.cookTime || recipe.servings"
					class="info mx-auto flex space-x-1 overflow-x-auto"
				>
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
			</template>
		</PageLayout>
		<div
			v-else
			class="p-4"
		>
			<UIAlert
				color="danger"
				variant="tonal"
			>
				Recipe not found
			</UIAlert>
		</div>
	</div>
</template>

<style scoped lang="scss">
section {
	@apply space-y-4;
}

.info {
	:deep(.ui-badge) {
		@apply flex items-center space-x-1 whitespace-nowrap;
		// @apply flex items-center space-x-1 whitespace-nowrap;
	}
}
</style>
