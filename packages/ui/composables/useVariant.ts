import type { Color } from '@/types/base/color'
import type { Variant } from '@/types/base/variant'

const variantMap: Record<Variant, Record<Color, string>> = {
	default: {
		default: 'bg-gray-100 text-default',
		primary: 'bg-primary text-white',
		secondary: 'bg-secondary text-white',
		accent: 'bg-accent text-default',
		success: 'bg-success text-white',
		warning: 'bg-warning text-default',
		danger: 'bg-danger text-white',
		info: 'bg-info text-white',
		white: 'bg-white text-default',
		light: 'bg-light text-default',
		dark: 'bg-dark text-white'
	},
	outlined: {
		default: 'bg-transparent border border-gray-100 text-default',
		primary: 'bg-transparent border border-primary text-primary',
		secondary: 'bg-transparent border border-secondary text-secondary',
		accent: 'bg-transparent border border-accent text-accent',
		success: 'bg-transparent border border-success text-success',
		warning: 'bg-transparent border border-warning text-default',
		danger: 'bg-transparent border border-danger text-danger',
		info: 'bg-transparent border border-info text-info',
		white: 'bg-transparent border border-white text-default',
		light: 'bg-transparent border border-light text-default',
		dark: 'bg-transparent border border-dark text-white'
	},
	tonal: {
		default: 'bg-gray-100/50 text-default',
		primary: 'bg-primary/10 text-primary',
		secondary: 'bg-secondary/10 text-secondary',
		accent: 'bg-accent/10 text-accent',
		success: 'bg-success/10 text-success',
		warning: 'bg-warning/10 text-default',
		danger: 'bg-danger/10 text-danger',
		info: 'bg-info/10 text-info',
		white: 'bg-white/10 text-default',
		light: 'bg-light/10 text-default',
		dark: 'bg-dark/10 text-white'
	},
	plain: {
		default: 'bg-transparent text-white',
		primary: 'bg-transparent text-primary',
		secondary: 'bg-transparent text-secondary',
		accent: 'bg-transparent text-accent',
		success: 'bg-transparent text-success',
		warning: 'bg-transparent text-default',
		danger: 'bg-transparent text-danger',
		info: 'bg-transparent text-info',
		white: 'bg-transparent text-default',
		light: 'bg-transparent text-default',
		dark: 'bg-transparent text-white'
	}
}

export const useVariant = (variant: Variant, color: Color): string => {
	// Check if the variant exists in the map
	if (!(variant in variantMap)) {
		throw new Error(`variant "${variant}" does not exist`)
	}

	// Check if the color exists within the chosen variant
	if (!(color in variantMap[variant]!)) {
		throw new Error(`color "${color}" does not exist for variant "${variant}"`)
	}

	return variantMap[variant]![color]!
}
