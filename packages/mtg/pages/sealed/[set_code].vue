<script setup lang="ts">
import { SlickList, SlickItem } from 'vue-slicksort'

import type { Card } from '@/types/card'

const pack = ref([] as Card[])

const getCards = async (setCode: string | string[], page?: number) => {
	const setCards = []

	const response = await fetch(
		`https://api.scryfall.com/cards/search?q=set:${setCode}&format=json?page=${page}&unique=prints`
	)

	const data = await response.json()

	if (data.data) {
		setCards.push(...data.data)
	}

	if (data.has_more && setCards.length < data.total_cards) {
		const nextPage = await getCards(setCode, data.next_page)

		setCards.push(...nextPage)
	}

	return setCards
}

const createPackCards = (cards: Card[]) => {
	const { generateIndexes, groupByType } = cardHelpers()

	const cardsByType = groupByType(cards)

	const packCards = []

	// Add 1 basic land
	const basicLandIndex = Math.floor(Math.random() * cardsByType.lands.basic.length)

	packCards.push(cardsByType.lands.basic[basicLandIndex])

	// Add 1 common, rare or mythic with 1/3 chance of rare and 1/8 chance of mythic
	if (Math.random() < 1 / 3) {
		const rareIndex = Math.floor(Math.random() * cardsByType.nonlands.rare.length)

		const selectedRare = cardsByType.nonlands.rare[rareIndex]

		packCards.push(selectedRare)
	} else if (Math.random() < 1 / 8) {
		const mythicIndex = Math.floor(Math.random() * cardsByType.nonlands.mythic.length)

		const selectedMythic = cardsByType.nonlands.mythic[mythicIndex]

		packCards.push(selectedMythic)
	} else {
		const commonIndex = generateIndexes(
			cardsByType.lands.nonbasic.common.length + cardsByType.nonlands.common.length,
			1
		)
		const selectedCommon =
			commonIndex < cardsByType.lands.nonbasic.common.length
				? cardsByType.lands.nonbasic.common[commonIndex]
				: cardsByType.nonlands.common[commonIndex - cardsByType.lands.nonbasic.common.length]

		packCards.push(selectedCommon)
	}

	// Add 9 commons
	const nonBasicLandCommonIndexes = generateIndexes(
		cardsByType.lands.nonbasic.common.length + cardsByType.nonlands.common.length,
		9
	)

	nonBasicLandCommonIndexes.forEach((index) => {
		const selectedCommon =
			index < cardsByType.lands.nonbasic.common.length
				? cardsByType.lands.nonbasic.common[index]
				: cardsByType.nonlands.common[index - cardsByType.lands.nonbasic.common.length]
		packCards.push(selectedCommon)
	})

	// Add 3 uncommons
	const uncommonIndexes = generateIndexes(
		cardsByType.lands.nonbasic.uncommon.length + cardsByType.nonlands.uncommon.length,
		3
	)

	uncommonIndexes.forEach((index) => {
		const selectedUncommon =
			index < cardsByType.lands.nonbasic.uncommon.length
				? cardsByType.lands.nonbasic.uncommon[index]
				: cardsByType.nonlands.uncommon[index - cardsByType.lands.nonbasic.uncommon.length]
		packCards.push(selectedUncommon)
	})

	// Add 1 rare or mythic
	const rareOrMythic = [
		...cardsByType.lands.nonbasic.rare,
		...cardsByType.lands.nonbasic.mythic,
		...cardsByType.nonlands.rare,
		...cardsByType.nonlands.mythic
	]

	const rareOrMythicIndex = Math.floor(Math.random() * rareOrMythic.length)

	packCards.push(rareOrMythic[rareOrMythicIndex])

	return packCards
}

const getPackCards = async (setCode: string | string[]) => {
	const cards = await getCards(setCode)

	if (cards.length === 0) {
		throw new Error('No cards found for the specified set.')
	}

	return createPackCards(cards)
}

onMounted(async () => {
	const route = useRoute()
	const setCode = route.params.set_code

	const packCards = await getPackCards(setCode)

	const { sortByRarity } = cardHelpers()

	pack.value = sortByRarity(packCards)
})
</script>

<template>
	<div class="overflow-scroll p-4">
		<div class="flex grow flex-col space-y-4">
			<SlickList
				v-model:list="pack"
				axis="xy"
				distance="20"
				class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
			>
				<SlickItem
					v-for="(card, cardIndex) in pack"
					:key="card.id"
					:index="cardIndex"
					class="m-2"
				>
					<Card :card="card" />
				</SlickItem>
			</SlickList>
		</div>
	</div>
</template>
