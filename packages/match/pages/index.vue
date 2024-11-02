<script setup lang="ts">
import { ArrowPathIcon } from '@heroicons/vue/24/outline'

type Item = { id: number; symbol: string; showSymbol: boolean; found: boolean }
type Step = 'COUNTDOWN' | 'MEMORIZE' | 'GAME_STARTED' | 'GAME_COMPLETED'

const currentStep = ref<Step>()
const countdown = ref<number | undefined>()
const elapsedTime = ref<string>('0.00')
const frameId = ref<number>(0)
const flipBackTimeoutId = ref()

const pairs = computed(() => 6)

const availableItems = computed(() => {
	const items = [
		{ symbol: '👻' },
		{ symbol: '🎃' },
		{ symbol: '🕷️' },
		{ symbol: '🕸️' },
		{ symbol: '🦇' },
		{ symbol: '🧟' }
	]

	if (pairs.value === 8) {
		items.push({ symbol: '🧛' }, { symbol: '💀' })
	}

	return items
})

const items = ref<Item[]>([])
const selectedItems = ref<Item[]>([])

const shuffleItems = () => {
	const selectedSymbols = availableItems.value
		.sort(() => 0.5 - Math.random())
		.slice(0, pairs.value)

	return selectedSymbols
		.flatMap((item, index) => {
			const baseItem = {
				id: index,
				symbol: item.symbol,
				showSymbol: false,
				found: false
			}
			return [baseItem, { ...baseItem }]
		})
		.sort(() => 0.5 - Math.random())
}

const initiateGame = () => {
	items.value = shuffleItems()

	currentStep.value = 'COUNTDOWN'
}

const startGame = () => {
	const startTime = Date.now()
	elapsedTime.value = '0.00'

	const updateElapsedTime = () => {
		elapsedTime.value = ((Date.now() - startTime) / 1000).toFixed(2)
		if (currentStep.value === 'GAME_STARTED') {
			frameId.value = requestAnimationFrame(updateElapsedTime)
		}
	}

	frameId.value = requestAnimationFrame(updateElapsedTime)
}

const startCountdown = (nextStep: Step, duration: number) => {
	countdown.value = duration

	const interval = setInterval(() => {
		countdown.value!--
		if (countdown.value === 0) {
			clearInterval(interval)
			currentStep.value = nextStep
			if (nextStep === 'GAME_STARTED') {
				startGame()
			}
		}
	}, 1000)
}

const showSymbol = (index: number) => {
	const item = items.value[index]

	if (item.showSymbol || item.found) return

	if (flipBackTimeoutId.value !== null) {
		clearTimeout(flipBackTimeoutId.value)
		flipBackTimeoutId.value = null
		selectedItems.value.forEach((selectedItem) => {
			selectedItem.showSymbol = false
		})
		selectedItems.value = []
	}

	if (selectedItems.value.length === 2) {
		selectedItems.value.forEach((selectedItem) => {
			selectedItem.showSymbol = false
		})
		selectedItems.value = []
	}

	item.showSymbol = true
	selectedItems.value.push(item)

	if (selectedItems.value.length === 2) {
		const [firstItem, secondItem] = selectedItems.value

		if (firstItem.id === secondItem.id) {
			firstItem.found = true
			secondItem.found = true
			selectedItems.value = []

			if (items.value.every((item) => item.found)) {
				currentStep.value = 'GAME_COMPLETED'
			}
		} else {
			flipBackTimeoutId.value = setTimeout(() => {
				selectedItems.value.forEach((selectedItem) => {
					selectedItem.showSymbol = false
				})
				selectedItems.value = []
				flipBackTimeoutId.value = null
			}, 500)
		}
	}
}

const reset = () => {
	// Reset all reactive properties to their initial values
	currentStep.value = undefined
	countdown.value = undefined
	elapsedTime.value = '0.00'

	// Cancel the animation frame
	cancelAnimationFrame(frameId.value)
	frameId.value = 0

	// Clear the timeout for flipping back the items
	clearTimeout(flipBackTimeoutId.value)
	flipBackTimeoutId.value = null

	// Re-shuffle the items to create a fresh game board
	// items.value = []
	selectedItems.value = []

	// Start the game again
	initiateGame()
}

watch(currentStep, (value) => {
	if (value === 'COUNTDOWN') {
		startCountdown('MEMORIZE', 3)
	} else if (value === 'MEMORIZE') {
		startCountdown('GAME_STARTED', 5)
	} else if (value !== 'GAME_STARTED') {
		cancelAnimationFrame(frameId.value)
	}
})
</script>

<template>
	<div class="h-full flex justify-center items-center">
		<UIButton
			v-if="!currentStep"
			color="primary"
			@click="initiateGame"
		>
			Start Game
		</UIButton>
		<template v-else-if="currentStep === 'COUNTDOWN'">
			<div class="text-5xl font-bold">{{ countdown }}</div>
		</template>
		<div
			v-else
			class="text-center w-[800px]"
		>
			<div class="text-2xl h-[50px]">
				<template v-if="currentStep === 'MEMORIZE'">
					Memorize:
					<strong>{{ countdown }}</strong>
				</template>
				<template v-else-if="currentStep === 'GAME_STARTED'">
					Match:
					<strong>{{ elapsedTime }}</strong>
				</template>
				<div
					v-else
					class="flex items-center justify-center space-x-4"
				>
					<div>
						Your time:
						<strong>{{ elapsedTime }}</strong>
					</div>
					<UIButton
						v-tippy="{ content: 'Try again', placement: 'top' }"
						color="primary"
						variant="text"
						icon
						@click="reset"
					>
						<UIIcon :icon="ArrowPathIcon" />
					</UIButton>
				</div>
			</div>
			<UIPanel
				class="inline-flex justify-center items-center border mx-auto"
			>
				<div class="grid gap-2 grid-cols-4">
					<UIPanel
						v-for="(item, index) in items"
						:key="index"
						:class="[
							'flex items-center justify-center border sm:text-5xl text-4xl sm:size-20 size-16',
							{
								'cursor-pointer hover:border-secondary':
									currentStep === 'GAME_STARTED' &&
									!item.showSymbol &&
									!item.found,
								'bg-white': item.found
							}
						]"
						@click="
							currentStep === 'GAME_STARTED' && showSymbol(index)
						"
					>
						{{
							currentStep === 'MEMORIZE'
								? item.symbol
								: item.showSymbol || item.found
									? item.symbol
									: ''
						}}
					</UIPanel>
				</div>
			</UIPanel>
		</div>
	</div>
</template>
