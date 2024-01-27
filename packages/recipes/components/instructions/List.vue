<script setup lang="ts">
import { SlickList, SlickItem, DragHandle } from 'vue-slicksort'

import { TrashIcon, ChevronUpDownIcon } from '@heroicons/vue/24/solid'

import type { Instruction } from '@/types/instruction'

type Emit = {
	(event: 'update:modelValue', value: Instruction[]): void
}

interface Props {
	modelValue: Instruction[]
}

const emit = defineEmits<Emit>()

const props = withDefaults(defineProps<Props>(), {
	modelValue: undefined
})

const instructions = computed({
	get: () => props.modelValue,
	set: (value) => {
		emit('update:modelValue', value)
	}
})

const instructionsContainerRef = ref<HTMLElement | null>(null)

// watch for new instructions and focus the textarea
watch(
	() => instructions.value.length,
	() => {
		nextTick(() => {
			const instructionsContainer = instructionsContainerRef.value

			if (instructionsContainer) {
				const newlyAddedInstruction = instructionsContainer.lastElementChild

				if (newlyAddedInstruction) {
					const instructionNameInput = newlyAddedInstruction.querySelector('textarea')

					if (instructionNameInput) {
						instructionNameInput.focus()
					}
				}
			}
		})
	}
)
</script>

<template>
	<SlickList
		v-model:list="instructions"
		axis="y"
		class="select-none"
		useDragHandle
	>
		<div ref="instructionsContainerRef">
			<SlickItem
				as="div"
				v-for="(instruction, index) in instructions"
				:key="index"
				:index="index"
				class="my-5 flex items-center space-x-2"
			>
				<DragHandle
					v-if="instructions.length > 1"
					class="cursor-pointer px-2"
				>
					<UIIcon
						:icon="ChevronUpDownIcon"
						size="md"
					/>
				</DragHandle>

				<UIFormGroup class="flex-grow">
					<UIFormLabel
						:for="`instruction-name-${index}`"
						class="sr-only"
					>
						Instruction
					</UIFormLabel>
					<UIFormTextarea
						:id="`instruction-name-${index}`"
						ref="instructionNameInputRef"
						v-model="instruction.description"
						:placeholder="`Instruction ${index + 1}`"
						rows="2"
					/>
				</UIFormGroup>

				<Button
					color="danger"
					variant="plain"
					icon
					v-tippy="{ content: 'Remove' }"
					@click="() => instructions.splice(index, 1)"
				>
					<UIIcon :icon="TrashIcon" />
				</Button>
			</SlickItem>
		</div>
	</SlickList>
</template>
