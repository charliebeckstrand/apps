<script setup lang="ts">
import type { Ingredient } from '@/types/ingredient'
import type { Instruction } from '@/types/instruction'

import { CloudArrowUpIcon, PlusIcon } from '@heroicons/vue/24/solid'

import type { Recipe } from '@/types/recipe'

type State = {
	name: string
	description: string
	thumbnail: string
	prepTime: number | undefined
	cookTime: number | undefined
	servings: number | undefined
	ingredients: Ingredient[]
	instructions: Instruction[]
	notes: string
}

type Emit = {
	(event: 'update:modelValue', value: State): void
}

interface Props {
	modelValue?: Recipe
}

const emit = defineEmits<Emit>()

const props = withDefaults(defineProps<Props>(), {
	modelValue: undefined
})

const state = reactive<State>({
	name: '',
	description: '',
	thumbnail: '',
	prepTime: undefined,
	cookTime: undefined,
	servings: undefined,
	ingredients: [],
	instructions: [],
	notes: ''
})

const fileInputRef = ref<HTMLInputElement | null>(null)

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
		quantity: undefined,
		unit: undefined
	})
}

const addInstruction = () => {
	state.instructions.push({
		description: ''
	})
}

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
	<div class="space-y-4">
		<UIFormGroup>
			<UIFormLabel for="recipe-name">Name</UIFormLabel>
			<UIFormInput
				id="recipe-name"
				v-model="state.name"
			/>
		</UIFormGroup>

		<UIFormGroup>
			<UIFormLabel for="recipe-description">Description</UIFormLabel>
			<UIFormTextarea
				id="recipe-description"
				v-model="state.description"
			/>
		</UIFormGroup>

		<UIFormGroup>
			<UIFormLabel for="recipe-thumbnail">Thumbnail</UIFormLabel>
			<UIFormItem>
				<UIFormInput
					id="recipe-thumbnail"
					v-model="state.thumbnail"
					placeholder="https://example.com/image.jpg"
				/>
				<template #append>
					<Button
						v-tippy="{ content: 'Upload File' }"
						color="info"
						variant="text"
						class="-mr-1"
						icon
						@click.prevent="uploadFile"
					>
						<UIIcon :icon="CloudArrowUpIcon" />
					</Button>
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

		<Button
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
		</Button>

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

		<Button
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
		</Button>

		<div class="grid gap-4 lg:grid-cols-3">
			<UIFormGroup>
				<UIFormLabel for="recipe-prep-time">Prep Time</UIFormLabel>
				<UIFormItem>
					<div class="flex items-center space-x-2">
						<UIFormInput
							id="recipe-prep-time"
							v-model="state.prepTime"
							type="number"
						/>
						<div>minutes</div>
					</div>
				</UIFormItem>
			</UIFormGroup>
			<UIFormGroup>
				<UIFormLabel for="recipe-cook-time">Cook Time</UIFormLabel>
				<UIFormItem>
					<div class="flex items-center space-x-2">
						<UIFormInput
							id="recipe-cook-time"
							v-model="state.cookTime"
							type="number"
						/>
						<div>minutes</div>
					</div>
				</UIFormItem>
			</UIFormGroup>
			<UIFormGroup>
				<UIFormLabel for="recipe-servings">Servings</UIFormLabel>
				<UIFormInput
					id="recipe-servings"
					v-model="state.servings"
					type="number"
				/>
			</UIFormGroup>
		</div>

		<UIFormGroup>
			<UIFormLabel for="recipe-notes">Notes</UIFormLabel>
			<UIFormTextarea
				id="recipe-notes"
				v-model="state.notes"
			/>
		</UIFormGroup>
	</div>
</template>

<style scoped lang="scss"></style>
