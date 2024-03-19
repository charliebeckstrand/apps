import type { Color, Variant } from '@/types/list'

const variantMap: Partial<Record<Variant, Partial<Record<Color, string>>>> = {
	default: {
		default: 'text-default',
		primary: 'text-primary',
		secondary: 'text-secondary',
		accent: 'text-accent'
	},
	outlined: {
		default: 'bg-transparent text-default border border-default',
		primary: 'bg-transparent text-primary border border-primary',
		secondary: 'bg-transparent text-secondary border border-secondary',
		accent: 'bg-transparent text-accent border border-accent'
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
