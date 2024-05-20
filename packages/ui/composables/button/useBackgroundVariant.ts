import type { Color } from '@/types/base/color'
import type { Variant } from '@/types/base/variant'

type ExtendedColor = Color | 'pink'
type ExtendedVariant = Variant | 'text' | 'plain'

const backgroundVariantMap: Record<ExtendedVariant, Record<ExtendedColor, string>> = {
	default: {
		default: 'bg-gray-100 hover:bg-gray-200',
		primary: 'bg-primary hover:bg-primary/90',
		secondary: 'bg-secondary hover:bg-secondary/90',
		accent: 'bg-accent hover:bg-accent/90',
		success: 'bg-success hover:bg-success/90',
		warning: 'bg-warning hover:bg-warning/90',
		danger: 'bg-danger hover:bg-danger/90',
		info: 'bg-info hover:bg-info/90',
		pink: 'bg-pink hover:bg-pink/90',
		white: 'bg-white hover:bg-white/90',
		light: 'bg-gray-100 hover:bg-gray-200/10',
		dark: 'bg-gray-800 hover:bg-gray-900/10'
	},
	outlined: {
		default: 'bg-transparent border-gray-300 hover:bg-gray-100',
		primary: 'bg-transparent border border-primary hover:bg-primary/10',
		secondary: 'bg-transparent border border-secondary hover:bg-secondary/10',
		accent: 'bg-transparent border border-accent hover:bg-accent/10',
		success: 'bg-transparent border border-success hover:bg-success/10',
		warning: 'bg-transparent border border-warning hover:bg-warning/10',
		danger: 'bg-transparent border border-danger hover:bg-danger/10',
		info: 'bg-transparent border border-info hover:bg-info/10',
		pink: 'bg-transparent border border-pink hover:bg-pink/10',
		white: 'bg-transparent border border-white hover:bg-white/10',
		light: 'bg-transparent border-gray-300 hover:bg-gray-100',
		dark: 'bg-transparent border-gray-700 hover:bg-gray-800'
	},
	tonal: {
		default: 'bg-gray-50 hover:bg-gray-100',
		primary: 'bg-primary/10 hover:bg-primary/20',
		secondary: 'bg-secondary/10 hover:bg-secondary/20',
		accent: 'bg-accent/10 hover:bg-accent/20',
		success: 'bg-success/10 hover:bg-success/20',
		warning: 'bg-warning/10 hover:bg-warning/20',
		danger: 'bg-danger/10 hover:bg-danger/20',
		info: 'bg-info/10 hover:bg-info/20',
		pink: 'bg-pink/10 hover:bg-pink/20',
		white: 'bg-white/10 hover:bg-white/20',
		light: 'bg-gray-50 hover:bg-gray-100',
		dark: 'bg-gray-900/10 hover:bg-gray-900/20'
	},
	text: {
		default: 'bg-transparent text-base hover:bg-gray-100',
		primary: 'bg-transparent text-primary hover:bg-primary/10',
		secondary: 'bg-transparent text-secondary hover:bg-secondary/10',
		accent: 'bg-transparent text-accent hover:bg-accent/10',
		success: 'bg-transparent text-success hover:bg-success/1t',
		warning: 'bg-transparent text-warning hover:bg-warning/10',
		danger: 'bg-transparent text-danger hover:bg-danger/10',
		info: 'bg-transparent text-info hover:bg-info/10',
		pink: 'bg-transparent text-pink hover:bg-pink/10',
		white: 'bg-transparent text-white',
		light: 'bg-transparent text-base',
		dark: 'bg-transparent text-base'
	},
	plain: {
		default: 'hover:underline',
		primary: 'hover:underline',
		secondary: 'hover:underline',
		accent: 'hover:underline',
		success: 'hover:underline',
		warning: 'hover:underline',
		danger: 'hover:underline',
		info: 'hover:underline',
		white: 'hover:underline',
		pink: 'hover:underline',
		light: 'hover:underline',
		dark: 'hover:underline'
	}
}

export const useBackgroundVariant = (variant: ExtendedVariant, color: ExtendedColor): string => {
	// Check if the variant exists in the map
	if (!backgroundVariantMap[variant]) {
		throw new Error(`variant "${variant}" does not exist`)
	}

	// Check if the color exists in the variant map
	if (!backgroundVariantMap[variant][color]) {
		throw new Error(`color "${color}" does not exist for variant "${variant}"`)
	}

	return backgroundVariantMap[variant][color]
}
