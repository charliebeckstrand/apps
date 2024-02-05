interface Ingredient {
	name: string
	quantity?: number
	unit?: {
		label: string
		value: string
	}
}

export type { Ingredient }
