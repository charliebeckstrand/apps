<script setup lang="ts">
import { SlickList, SlickItem, DragHandle } from 'vue-slicksort'

import { TrashIcon, ChevronUpDownIcon } from '@heroicons/vue/24/solid'

import type { Instruction } from '@/types/instruction'

type Emit = (event: 'update:modelValue', ...args: unknown[]) => void

type Props = {
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

				<div
					class="min-w-[1.5rem] pr-3"
					:class="{ 'pl-3': instructions.length === 1 }"
				>
					{{ index + 1 }}
				</div>

				<UIFormInput
					ref="instructionNameInputRef"
					v-model="instruction.description"
				/>

				<UIButton
					color="danger"
					variant="plain"
					icon
					v-tippy="{ content: 'Remove' }"
					@click="() => instructions.splice(index, 1)"
				>
					<UIIcon :icon="TrashIcon" />
				</UIButton>
			</SlickItem>
		</div>
	</SlickList>
</template>
