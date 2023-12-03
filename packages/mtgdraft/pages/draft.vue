<script setup lang="ts">
interface Card {
	id: string
}

const state = reactive({
	cards: [],
	deck: [],
	pickedCard: {} as Card
})

const getCards = async (setCode: string) => {
	const response = await fetch(`https://api.scryfall.com/cards/search?q=set:${setCode}`)

	const data = await response.json()

	return data.data
}

const selectCard = (card: Card) => {
	state.pickedCard.id = state.pickedCard.id !== card.id ? card.id : null
}

const pickCard = (card: Card) => {
	const cardId = card && card.id ? card.id : state.pickedCard.id
	const cardIndex = state.cards.findIndex((card) => card.id === cardId)

	if (cardId) {
		state.deck.push(cardId)
		state.cards.splice(cardIndex, 1)
	}

	state.pickedCard.id = null
}

onMounted(async () => {
	const cards = await getCards('MOM')

	state.cards = cards
})
</script>

<template>
	<div>
		<Header />

		<div class="overflow-scroll px-5 pb-5">
			<div class="flex grow flex-col space-y-5 overflow-scroll">
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
								@esc="state.pickedCard = {}"
							/>
						</template>
					</div>
				</div>
			</div>

			<div
				class="fixed bottom-7 right-7 z-30 origin-right transition duration-100"
				:class="{
					'scale-100': state.pickedCard.id,
					'scale-0': !state.pickedCard.id
				}"
			>
				<UIButton
					class="font-bold shadow-xl"
					@click="pickCard"
				>
					<span>Pick Card</span>
					<template #append>
						<Icon icon="ChevronRightIcon" />
					</template>
				</UIButton>
			</div>
		</div>
	</div>
</template>
