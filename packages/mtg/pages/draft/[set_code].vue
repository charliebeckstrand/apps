<script setup lang="ts">
import type { Card } from '@/types/card'

const state = reactive({
	cards: [] as Card[],
	deck: [] as string[],
	pickedCard: {} as Card
})

const getCards = async (setCode: string | string[]) => {
	const response = await fetch(`https://api.scryfall.com/cards/search?q=set:${setCode}`)

	const data = await response.json()

	return data.data
}

const selectCard = (card: Card) => {
	if (state.pickedCard.id !== card.id) {
		state.pickedCard = card
	} else {
		state.pickedCard = {} as Card
	}
}

const pickCard = (card: Card) => {
	const { cards, deck, pickedCard } = state
	const cardId = card?.id ?? pickedCard.id
	const cardIndex = cards.findIndex((c) => c.id === cardId)

	// Early exit if the cardId is not valid or the card is already in the deck
	if (!cardId || deck.includes(cardId)) {
		pickedCard.id = null
		return
	}

	deck.push(cardId)

	cards.splice(cardIndex, 1)

	pickedCard.id = null
}

const clearPickedCard = () => {
	state.pickedCard = {} as Card
}

onMounted(async () => {
	const route = useRoute()
	const setCode = route.params.set_code ?? 'MOM'

	const cards = await getCards(setCode)

	state.cards = cards
})
</script>

<template>
	<div>
		<Header />

		<div class="overflow-scroll px-4 pb-4">
			<div class="flex grow flex-col space-y-4 overflow-scroll">
				<div class="grid flex-grow">
					<div
						class="cards grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
					>
						<template
							v-for="(card, index) in state.cards"
							:key="index"
						>
							<Card
								:card="card"
								:selected="state.pickedCard.id == card.id"
								:inactive="state.pickedCard.id && state.pickedCard.id !== card.id ? true : false"
								@click="selectCard(card)"
								@esc="clearPickedCard"
							/>
						</template>
					</div>
				</div>
			</div>

			<div
				class="fixed bottom-7 right-7 z-30 transition duration-100"
				:class="{
					'opacity-100': state.pickedCard.id,
					'opacity-0': !state.pickedCard.id
				}"
			>
				<UIButton
					class="font-bold shadow-2xl"
					color="primary"
					@click="pickCard"
				>
					Pick Card
					<template #append>
						<Icon icon="ChevronRightIcon" />
					</template>
				</UIButton>
			</div>
		</div>
	</div>
</template>
