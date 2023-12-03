<script setup lang="ts">
import { HeartIcon as OutlineHeartIcon } from '@heroicons/vue/24/outline'
import { HeartIcon as SolidHeartIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/solid'

import type { Recipe } from '@/types/recipe'

type Props = {
	recipe?: Recipe
	color?: string
	variant?: string
}

const props = withDefaults(defineProps<Props>(), {
	recipe: undefined,
	color: 'primary',
	variant: 'plain'
})

const recipe = ref(props.recipe) as Ref<Recipe>
</script>

<template>
	<UICard
		:color="props.color"
		:variant="props.variant"
		:to="`/recipes/${recipe.id}`"
	>
		<div class="flex items-center space-x-5">
			<UIThumbnail
				v-if="recipe.thumbnail"
				:src="recipe.thumbnail"
				height="48"
				width="48"
			/>

			<UIHeader class="flex-grow">
				{{ recipe.name }}
			</UIHeader>

			<div class="ml-auto flex items-center space-x-1">
				<UIButton
					color="pink"
					variant="text"
					icon
					v-tippy="{ content: recipe.favorite ? 'Unfavorite' : 'Favorite' }"
					@click.prevent="recipe.favorite = !recipe.favorite"
				>
					<UIIcon :icon="recipe.favorite ? SolidHeartIcon : OutlineHeartIcon" />
				</UIButton>
				<div v-tippy="{ content: 'Edit' }">
					<UIButton
						color="info"
						variant="text"
						icon
						:to="`/recipes/${recipe.id}/edit`"
						@click.prevent
					>
						<UIIcon :icon="PencilIcon" />
					</UIButton>
				</div>
				<UIButton
					color="danger"
					variant="text"
					icon
					v-tippy="{ content: 'Delete' }"
					@click.prevent
				>
					<UIIcon :icon="TrashIcon" />
				</UIButton>
			</div>
		</div>
	</UICard>
</template>
