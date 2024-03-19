import type { Color, Variant } from '@/types/navbar'

const variantMap: Record<Variant, Record<Color, string>> = {
	default: {
		primary: 'bg-primary',
		secondary: 'bg-secondary',
		transparent: 'bg-transparent'
	}
}

export const useVariant = (variant: Variant, color: Color): string => {
	// Check if the variant exists in the map
	if (!(variant in variantMap)) {
		throw new Error(`Variant "${variant}" is not supported`)
	}

	// Check if the color exists within the chosen variant
	if (!(color in variantMap[variant]!)) {
		throw new Error(`Color "${color}" is not supported for variant "${variant}"`)
	}

	return variantMap[variant]![color]!
}
