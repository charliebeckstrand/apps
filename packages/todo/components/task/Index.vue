<script setup lang="ts">
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/solid'

import type { Task } from '@/types/task'

interface Props {
	task: Task
}

type Emit = {
	(key: 'edit', task: Task): void
	(key: 'delete', task: Task): void
}

const Emit = defineEmits<Emit>()

const { task } = defineProps<Props>()

const actions = [
	{
		value: 'Edit',
		icon: PencilIcon,
		onClick: () => {
			console.log('Edit')
		}
	},
	{
		value: 'Delete',
		icon: TrashIcon,
		onClick: () => {
			console.log('Delete')

			Emit('delete', task)
		}
	}
]

const taskDialog = ref(false)

const showTaskDialog = () => {
	taskDialog.value = true
}
</script>

<template>
	<div>
		<UICard
			color="white"
			class="task select-none border border-gray-200"
			@click="showTaskDialog"
		>
			<template #title>
				{{ task.title }}
			</template>
			<template #subtitle>
				{{ task.description }}
			</template>
			<template #header-append>
				<div class="actions-menu">
					<UIMenu :items="actions">
						<template #trigger>
							<UIButton icon>
								<UIIcon :icon="EllipsisVerticalIcon" />
							</UIButton>
						</template>
					</UIMenu>
				</div>
			</template>
		</UICard>

		<UIDialog
			v-model="taskDialog"
			size="lg"
		>
			<template #title>
				{{ task.title }}
			</template>

			<div class="my-4 text-gray-600">
				{{ task.description }}
			</div>

			<template #actions>
				<div class="flex justify-end">
					<UIButton
						color="danger"
						@click="taskDialog = false"
					>
						Close
					</UIButton>
				</div>
			</template>
		</UIDialog>
	</div>
</template>

<style scoped lang="scss">
.task {
	.actions-menu {
		display: none;
	}

	&:hover {
		.actions-menu {
			display: flex;
		}
	}
}
</style>
