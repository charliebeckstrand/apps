import { ICard } from '@/types/card'

const cardHelpers = () => {
	const generateIndexes = (maxIndex: number, count: number) => {
		const indexes = new Set()

		while (indexes.size < count) {
			const randomIndex = Math.floor(Math.random() * maxIndex)
			indexes.add(randomIndex)
		}

		return Array.from(indexes)
	}

	const sortByRarity = (cards: ICard[]) => {
		return cards.sort((a: ICard, b: ICard) => {
			const rarityA = a.rarity
			const rarityB = b.rarity

			if (rarityA === 'common') {
				if (rarityB === 'common') return 0
				else return -1
			} else if (rarityA === 'uncommon') {
				if (rarityB === 'common') return 1
				else if (rarityB === 'uncommon') return 0
				else return -1
			} else if (rarityA === 'rare') {
				if (rarityB === 'common' || rarityB === 'uncommon') return 1
				else if (rarityB === 'rare') return 0
				else return -1
			} else {
				if (rarityB === 'mythic') return 0
				else return 1
			}
		})
	}

	const groupByType = (cards: ICard[]) => {
		return cards.reduce(
			(acc: any, card: ICard) => {
				const rarity = card.rarity
				const type = card.type_line

				if (type.includes('Land')) {
					if (type.includes('Basic Land')) acc.lands.basic.push(card)
					else {
						const nonBasicRarity =
							rarity === 'common'
								? 'common'
								: rarity === 'uncommon'
								? 'uncommon'
								: rarity === 'rare'
								? 'rare'
								: 'mythic'
						acc.lands.nonbasic[nonBasicRarity].push(card)
					}
				} else {
					const nonLandRarity =
						rarity === 'common'
							? 'common'
							: rarity === 'uncommon'
							? 'uncommon'
							: rarity === 'rare'
							? 'rare'
							: 'mythic'
					acc.nonlands[nonLandRarity].push(card)
				}

				return acc
			},
			{
				lands: {
					basic: [],
					nonbasic: {
						common: [],
						uncommon: [],
						rare: [],
						mythic: []
					}
				},
				nonlands: {
					common: [],
					uncommon: [],
					rare: [],
					mythic: []
				}
			}
		)
	}

	return { generateIndexes, sortByRarity, groupByType }
}

export { cardHelpers }
