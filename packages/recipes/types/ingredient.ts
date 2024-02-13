interface Ingredient {
	quantity: string | number
	unit?: {
		label: string
		value: string
	}
	name: string
}

export type { Ingredient }
