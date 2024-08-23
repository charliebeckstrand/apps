<script setup lang="ts">
import { SlickList, SlickItem } from 'vue-slicksort'
import { PlusIcon } from '@heroicons/vue/24/outline'

import type { Lane } from '@/types/lane'
import type { Task } from '@/types/task'

interface Props {
	lane: Lane
}

interface Props {
	lane: Lane
}

const emit = defineEmits(['update:modelValue'])

const { lane } = defineProps<Props>()

const tasks = computed({
	get: () => lane.tasks || [],
	set: (value: Task[]) => {
		emit('update:modelValue', value)
	}
})

if (lane.id === 'todo') {
	tasks.value = [
		{
			id: '1',
			title: 'Take out the trash',
			description: 'Take out the trash before it starts to smell'
		},
		{
			id: '2',
			title: 'Do the dishes',
			description: 'Do the dishes before they start to pile up'
		},
		{
			id: '3',
			title: 'Make the bed',
			description: 'Make the bed before you get back in it'
		}
	]
}

const addTaskDialog = ref(false)

const newTask = reactive({
	title: '',
	description: ''
})

const addTask = () => {
	tasks.value.push({
		id: String(tasks.value.length + 1),
		title: newTask.title,
		description: newTask.description
	})

	addTaskDialog.value = false

	newTask.title = ''
	newTask.description = ''
}

const deleteTask = (task: Task) => {
	const index = lane.tasks?.findIndex((t) => t.id === task.id)

	if (lane.tasks) {
		tasks.value.splice(index!, 1)
	}
}

const titleInput = ref()

watchEffect(() => {
	if (addTaskDialog.value) {
		nextTick(() => {
			titleInput.value?.$el.focus()
		})
	}
})
</script>

<template>
	<div class="h-full w-full">
		<div class="lane flex h-full w-full min-w-[320px] flex-col space-y-2">
			<div class="header flex items-center justify-between space-x-4">
				<div>
					{{ lane.name }}
				</div>
				<div>
					<UIButton
						v-tippy="{ content: 'Add Task' }"
						color="success"
						variant="text"
						icon
						class="add-item-button focus:visible"
						@click="addTaskDialog = true"
					>
						<UIIcon :icon="PlusIcon" />
					</UIButton>
				</div>
			</div>
			<SlickList
				v-model:list="tasks"
				group="tasks"
				lock-axis="yx"
				lock-to-container-edges
				:lock-offset="[0, 0]"
				:distance="4"
				class="bg-accent/5 border-accent/10 flex-grow rounded-lg border p-4"
			>
				<SlickItem
					v-for="(task, index) in tasks"
					:key="index"
					:index="index"
					class="mb-2 cursor-pointer"
				>
					<Task
						:task="task"
						@delete="deleteTask"
					/>
				</SlickItem>
			</SlickList>
		</div>

		<UIDialog v-model="addTaskDialog">
			<template #title>Add Task</template>
			<template #default>
				<div class="my-4 space-y-2">
					<UIFormInput
						ref="titleInput"
						v-model="newTask.title"
						label="Title"
						placeholder="Enter a title"
					/>
					<UIFormTextarea
						v-model="newTask.description"
						label="Description"
						placeholder="Enter a description"
					/>
				</div>
			</template>
			<template #actions>
				<div class="flex justify-end space-x-2">
					<UIButton
						color="danger"
						@click="addTaskDialog = false"
					>
						Cancel
					</UIButton>
					<UIButton
						color="success"
						@click="addTask"
					>
						Add
					</UIButton>
				</div>
			</template>
		</UIDialog>
	</div>
</template>

<style scoped lang="scss">
.lane {
	&:focus,
	&:focus-within {
		// outline: none;
		.add-item-button {
			visibility: visible;
		}
	}

	.header {
		.add-item-button {
			visibility: hidden;
		}

		&:hover {
			.add-item-button {
				visibility: visible;
			}
		}
	}
}
</style>
