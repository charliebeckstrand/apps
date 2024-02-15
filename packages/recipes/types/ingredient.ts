interface Ingredient {
	name: string
	quantity: string | number | undefined
	unit?: {
		label: string
		value: string
	}
}

export type { Ingredient }
