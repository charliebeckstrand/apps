<script setup lang="ts">
import { SlickList, SlickItem, DragHandle } from 'vue-slicksort'

import { TrashIcon, ChevronUpDownIcon } from '@heroicons/vue/24/solid'

import type { Ingredient } from '@/types/ingredient'

type Emit = {
	(event: 'update:modelValue', value: Ingredient[]): void
}

interface Props {
	modelValue: Ingredient[]
}

const emit = defineEmits<Emit>()

const props = withDefaults(defineProps<Props>(), {
	modelValue: undefined
})

const ingredients = computed({
	get: () => props.modelValue,
	set: (value: Ingredient[]) => {
		emit('update:modelValue', value)
	}
})

const ingredientsContainerRef = ref<HTMLElement | null>(null)

// watch for new ingredients and focus the name input
watch(
	() => ingredients.value.length,
	() => {
		nextTick(() => {
			const ingredientsContainer = ingredientsContainerRef.value

			if (ingredientsContainer) {
				const newlyAddedIngredient = ingredientsContainer.lastElementChild

				if (newlyAddedIngredient) {
					const ingredientNameInput = newlyAddedIngredient.querySelector('input')

					if (ingredientNameInput) {
						ingredientNameInput.focus()
					}
				}
			}
		})
	}
)
</script>

<template>
	<SlickList
		v-model:list="ingredients"
		axis="y"
		class="select-none"
		useDragHandle
	>
		<div ref="ingredientsContainerRef">
			<SlickItem
				as="div"
				v-for="(ingredient, index) in ingredients"
				:key="index"
				:index="index"
				class="my-5 flex items-center space-x-2"
			>
				<DragHandle
					v-if="ingredients.length > 1"
					class="cursor-pointer px-2"
				>
					<UIIcon
						:icon="ChevronUpDownIcon"
						size="md"
					/>
				</DragHandle>

				<div class="grid flex-grow gap-2 md:grid-cols-2">
					<UIFormGroup>
						<UIFormLabel
							:for="`ingredient-quantity-${index}`"
							size="sm"
							class="sr-only"
						>
							Quantity
						</UIFormLabel>
						<UIFormInput
							:id="`ingredient-quantity-${index}`"
							placeholder="Quantity"
							v-model="ingredient.quantity"
						/>
					</UIFormGroup>
					<UIFormGroup>
						<UIFormLabel
							:for="`ingredient-name-${index}`"
							size="sm"
							class="sr-only"
						>
							Name
						</UIFormLabel>
						<UIFormInput
							:id="`ingredient-name-${index}`"
							ref="ingredientNameInputRef"
							v-model="ingredient.name"
							placeholder="Item"
						/>
					</UIFormGroup>
				</div>
				<Button
					color="danger"
					variant="text"
					icon
					v-tippy="{ content: 'Remove' }"
					@click="() => ingredients.splice(index, 1)"
				>
					<UIIcon :icon="TrashIcon" />
				</Button>
			</SlickItem>
		</div>
	</SlickList>
</template>
