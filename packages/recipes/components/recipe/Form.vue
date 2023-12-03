<script setup lang="ts">
import type { Ingredient } from '@/types/ingredient'
import type { Instruction } from '@/types/instruction'

import { CloudArrowUpIcon, PlusIcon } from '@heroicons/vue/24/solid'

import type { Recipe } from '@/types/recipe'

type Emit = (event: 'update:modelValue', ...args: unknown[]) => void

interface Props {
	modelValue?: Recipe
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: undefined
})

const emit = defineEmits<Emit>()

const state = reactive({
	name: '',
	description: '',
	thumbnail: '',
	prepTime: null,
	cookTime: null,
	servings: null,
	ingredients: [] as Ingredient[],
	instructions: [] as Instruction[],
	notes: ''
})

watch(
	() => props.modelValue,
	(recipe) => {
		if (recipe) {
			Object.assign(state, recipe)
		}
	},
	{ immediate: true }
)

watch(
	() => state,
	() => {
		emit('update:modelValue', state)
	},
	{ deep: true }
)

const addIngredient = () => {
	state.ingredients.push({
		name: '',
		quantity: null,
		unit: null
	})

	nextTick(() => {
		const ingredientsContainer = ingredientsContainerRef.value

		if (ingredientsContainer) {
			const newlyAddedIngredient = ingredientsContainer.lastElementChild
			if (newlyAddedIngredient) {
				newlyAddedIngredient.scrollIntoView({ behavior: 'smooth' })

				const ingredientNameInput = newlyAddedIngredient.querySelector('input')

				if (ingredientNameInput) {
					ingredientNameInput.focus()
				}
			}
		}
	})
}

const addInstruction = () => {
	state.instructions.push({
		description: ''
	})

	nextTick(() => {
		const instructionsContainer = instructionsContainerRef.value

		if (instructionsContainer) {
			const newlyAddedInstruction = instructionsContainer.lastElementChild
			if (newlyAddedInstruction) {
				newlyAddedInstruction.scrollIntoView({ behavior: 'smooth' })

				const instructionNameInput = newlyAddedInstruction.querySelector('input')

				if (instructionNameInput) {
					instructionNameInput.focus()
				}
			}
		}
	})
}

const ingredientsContainerRef = ref<HTMLElement | null>(null)
const instructionsContainerRef = ref<HTMLElement | null>(null)

const fileInputRef = ref<HTMLInputElement | null>(null)

const uploadFile = () => {
	const fileInput = fileInputRef.value

	console.log(fileInput)

	if (fileInput) {
		fileInput.click()
	}
}

const handleFileUpload = (event: Event) => {
	const target = event.target as HTMLInputElement

	const file = target.files?.[0]

	if (file) {
		console.log(file)
	}
}
</script>

<template>
	<div class="space-y-5">
		<UIFormGroup>
			<UIFormLabel>Name</UIFormLabel>
			<UIFormInput v-model="state.name" />
		</UIFormGroup>

		<UIFormGroup>
			<UIFormLabel>Description</UIFormLabel>
			<UIFormTextarea v-model="state.description" />
		</UIFormGroup>

		<UIFormGroup>
			<UIFormLabel>Thumbnail</UIFormLabel>
			<UIFormItem>
				<UIFormInput
					v-model="state.thumbnail"
					placeholder="https://example.com/image.jpg"
				/>
				<template #append>
					<UIButton
						v-tippy="{ content: 'Upload' }"
						color="info"
						variant="plain"
						icon
						@click.prevent="uploadFile"
					>
						<UIIcon :icon="CloudArrowUpIcon" />
					</UIButton>
				</template>
			</UIFormItem>
			<input
				ref="fileInputRef"
				type="file"
				class="invisible absolute left-0 top-0"
				@change="handleFileUpload"
			/>
		</UIFormGroup>

		<UIHeader>
			<template #title>Ingredients</template>
		</UIHeader>

		<IngredientsList
			v-show="state.ingredients.length"
			v-model="state.ingredients"
		/>

		<UIAlert
			v-show="!state.ingredients.length"
			color="warning"
			variant="tonal"
			class="select-none"
		>
			No ingredients added
		</UIAlert>

		<UIButton
			color="info"
			variant="outlined"
			size="sm"
			@click="addIngredient"
		>
			<template #prepend>
				<UIIcon
					:icon="PlusIcon"
					size="sm"
				/>
			</template>
			Add Ingredient
		</UIButton>

		<UIHeader>
			<template #title>Instructions</template>
		</UIHeader>

		<InstructionsList
			v-show="state.instructions.length"
			v-model="state.instructions"
		/>

		<UIAlert
			v-show="!state.instructions.length"
			color="warning"
			variant="tonal"
			class="select-none"
		>
			No instructions added
		</UIAlert>

		<UIButton
			color="info"
			variant="outlined"
			size="sm"
			@click="addInstruction"
		>
			<template #prepend>
				<UIIcon
					:icon="PlusIcon"
					size="sm"
				/>
			</template>
			Add Instruction
		</UIButton>

		<div class="grid gap-5 lg:grid-cols-3">
			<UIFormGroup>
				<UIFormLabel>Prep Time</UIFormLabel>
				<UIFormItem type="number">
					<UIFormInput
						v-model="state.prepTime"
						type="number"
					/>
					<template #append>minutes</template>
				</UIFormItem>
			</UIFormGroup>
			<UIFormGroup>
				<UIFormLabel>Cook Time</UIFormLabel>
				<UIFormItem type="number">
					<UIFormInput
						v-model="state.cookTime"
						type="number"
					/>
					<template #append>minutes</template>
				</UIFormItem>
			</UIFormGroup>
			<UIFormGroup>
				<UIFormLabel>Servings</UIFormLabel>
				<UIFormInput
					v-model="state.servings"
					type="number"
				/>
			</UIFormGroup>
		</div>

		<UIFormGroup>
			<UIFormLabel>Notes</UIFormLabel>
			<UIFormTextarea v-model="state.notes" />
		</UIFormGroup>
	</div>
</template>

<style scoped lang="scss"></style>
