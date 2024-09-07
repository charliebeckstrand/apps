<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { PlusIcon } from '@heroicons/vue/24/solid'

import type { Ingredient } from '@/types/ingredient'
import type { Instruction } from '@/types/instruction'
import type { Recipe } from '@/types/recipe'

type Emit = {
	(event: 'update:modelValue', value: State): void
}

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

interface Props {
	modelValue?: Recipe
}

const name = ref<HTMLInputElement | null>(null)
const description = ref<HTMLTextAreaElement | null>(null)
const prepTime = ref<HTMLInputElement | null>(null)
const cookTime = ref<HTMLInputElement | null>(null)
const servings = ref<HTMLInputElement | null>(null)
const notes = ref<HTMLTextAreaElement | null>(null)

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

const rules = {
	name: { required }
}

const v$ = useVuelidate(rules, state)

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
</script>

<template>
	<div class="space-y-4">
		<UIFormGroup :validation="v$.name">
			<UIFormLabel for="recipe-name">Name</UIFormLabel>
			<UIFormInput
				id="recipe-name"
				ref="name"
				v-model="state.name"
			/>
		</UIFormGroup>

		<UIFormGroup>
			<UIFormLabel for="recipe-description">Description</UIFormLabel>
			<UIFormTextarea
				id="recipe-description"
				ref="description"
				v-model="state.description"
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
							ref="prepTime"
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
							ref="cookTime"
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
					ref="servings"
					v-model="state.servings"
					type="number"
				/>
			</UIFormGroup>
		</div>

		<UIFormGroup>
			<UIFormLabel for="recipe-notes">Notes</UIFormLabel>
			<UIFormTextarea
				id="recipe-notes"
				ref="notes"
				v-model="state.notes"
			/>
		</UIFormGroup>
	</div>
</template>
