<script setup lang="ts">
import { SlickList, SlickItem, DragHandle } from 'vue-slicksort'

import type { Ingredient } from '@/types/ingredient'

import { TrashIcon, ChevronUpDownIcon } from '@heroicons/vue/24/solid'

import { measurements } from '@/common/measurements'

type Emit = (event: 'update:modelValue', ...args: unknown[]) => void

type Props = {
	modelValue: Ingredient[]
}

const emit = defineEmits(['update:modelValue']) as Emit

const props = withDefaults(defineProps<Props>(), {
	modelValue: undefined
})

const ingredients = computed({
	get: () => props.modelValue,
	set: (value) => {
		emit('update:modelValue', value)
	}
})
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

				<div class="grid flex-grow gap-2 md:grid-cols-3">
					<UIFormInput
						ref="ingredientNameInputRef"
						v-model="ingredient.name"
						placeholder="Name"
					/>
					<UIFormItem>
						<UIFormInput
							type="number"
							placeholder="Quantity"
							v-model="ingredient.quantity"
						/>
					</UIFormItem>

					<UIFormItem>
						<UICombobox
							v-model="ingredient.unit"
							placeholder="Unit of Measurement"
							:items="measurements"
						/>
					</UIFormItem>
				</div>

				<UIButton
					color="danger"
					variant="plain"
					icon
					v-tippy="{ content: 'Remove' }"
					@click="() => ingredients.splice(index, 1)"
				>
					<UIIcon :icon="TrashIcon" />
				</UIButton>
			</SlickItem>
		</div>
	</SlickList>
</template>
