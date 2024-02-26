<script setup lang="ts">
import { ref } from 'vue'

import { PencilIcon, StarIcon, BoltIcon, FaceSmileIcon } from '@heroicons/vue/24/outline'

const tools = [
	{
		icon: PencilIcon,
		name: 'Pencil'
	},
	{
		icon: StarIcon,
		name: 'Star'
	},
	{
		icon: BoltIcon,
		name: 'Bolt'
	},
	{
		icon: FaceSmileIcon,
		name: 'FaceSmile'
	}
]

const activeTool = ref()

const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'pink']

const getBackgroundColor = (color: string) => {
	const colorMap: Record<string, string> = {
		red: 'bg-red-500',
		blue: 'bg-blue-500',
		green: 'bg-green-500',
		yellow: 'bg-yellow-500',
		purple: 'bg-purple-500',
		pink: 'bg-pink-500'
	}

	return colorMap[color]
}

const getBorderColor = (color: string) => {
	const colorMap: Record<string, string> = {
		red: 'border-red-500',
		blue: 'border-blue-500',
		green: 'border-green-500',
		yellow: 'border-yellow-500',
		purple: 'border-purple-500',
		pink: 'border-pink-500'
	}

	return colorMap[color]
}

const activeColor = ref()

const drawingAreaRef = ref<HTMLElement | null>(null)
</script>

<template>
	<div class="flex h-full">
		<div class="m-auto">
			<div class="flex flex-col gap-4 md:flex-row">
				<div class="drawing-tools mx-auto flex flex-row gap-2 md:mx-0 md:flex-col">
					<div
						v-for="(tool, index) in tools"
						:key="index"
					>
						<UIButton
							icon
							color="primary"
							:variant="tool.name === activeTool ? 'default' : 'tonal'"
							@click="activeTool = tool.name"
						>
							<UIIcon :icon="tool.icon" />
						</UIButton>
					</div>
				</div>
				<div class="drawing-colors mx-auto flex flex-row gap-2 md:mx-0 md:flex-col">
					<div
						v-for="(color, index) in colors"
						:key="index"
						class="cursor-pointer"
						@click="activeColor = color"
					>
						<div
							class="rounded-full border p-0.5"
							:class="activeColor === color ? getBorderColor(color) : `hover:${getBorderColor(color)}`"
						>
							<div
								class="h-5 w-5 rounded-full"
								:class="getBackgroundColor(color)"
							></div>
						</div>
					</div>
				</div>
				<div class="rounded border p-0.5">
					<div
						ref="drawingAreaRef"
						class="drawing-area h-[400px] w-[400px] rounded bg-gray-200"
					></div>
				</div>
			</div>
		</div>
	</div>
</template>
