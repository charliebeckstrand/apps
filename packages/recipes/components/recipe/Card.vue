<script setup lang="ts">
import { HeartIcon as OutlineHeartIcon } from '@heroicons/vue/24/outline'
import { HeartIcon as SolidHeartIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/solid'

import { useAuthStore } from '@/stores/auth'

import type { Recipe } from '@/types/recipe'

interface Props {
	recipe?: Recipe
}

const props = withDefaults(defineProps<Props>(), {
	recipe: undefined
})

const authStore = useAuthStore()

const recipe = ref(props.recipe) as Ref<Recipe>
</script>

<template>
	<UICard
		:to="`/recipes/${recipe.id}`"
		interactive
	>
		<div class="flex items-center space-x-5">
			<UIThumbnail
				v-if="recipe.thumbnail"
				:src="recipe.thumbnail"
				height="48"
				width="48"
			/>

			<UIHeader class="flex-grow">
				<template v-if="recipe.name">
					{{ recipe.name }}
				</template>
				<template v-else>
					<span class="text-gray-400">Untitled Recipe</span>
				</template>
			</UIHeader>

			<div class="ml-auto flex items-center space-x-1">
				<Button
					color="pink"
					variant="text"
					icon
					v-tippy="{ content: recipe.favorite ? 'Unfavorite' : 'Favorite' }"
					@click.prevent="recipe.favorite = !recipe.favorite"
				>
					<UIIcon :icon="recipe.favorite ? SolidHeartIcon : OutlineHeartIcon" />
				</Button>
				<div v-tippy="{ content: 'Edit' }">
					<Button
						v-if="authStore.user?.id"
						color="info"
						variant="text"
						icon
						:to="`/recipes/${recipe.id}/edit`"
						@click.prevent
					>
						<UIIcon :icon="PencilIcon" />
					</Button>
				</div>
				<Button
					v-if="authStore.user?.id"
					color="danger"
					variant="text"
					icon
					v-tippy="{ content: 'Delete' }"
					@click.prevent
				>
					<UIIcon :icon="TrashIcon" />
				</Button>
			</div>
		</div>
	</UICard>
</template>
