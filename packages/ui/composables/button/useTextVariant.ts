import type { Color } from '@/types/base/color'
import type { Variant } from '@/types/base/variant'

type ExtendedColor = Color | 'pink'
type ExtendedVariant = Variant | 'text' | 'plain'

const textVariantMap: Record<ExtendedVariant, Record<ExtendedColor, string>> = {
	default: {
		default: 'text-default',
		primary: 'text-white',
		secondary: 'text-white',
		accent: 'text-default',
		success: 'text-white',
		warning: 'text-default',
		danger: 'text-white',
		info: 'text-white',
		white: 'text-white',
		light: 'text-default',
		dark: 'text-white',
		pink: 'text-white'
	},
	outlined: {
		default: 'text-default',
		primary: 'text-primary',
		secondary: 'text-secondary',
		accent: 'text-accent',
		success: 'text-success',
		warning: 'text-default',
		danger: 'text-danger',
		info: 'text-info',
		white: 'text-white',
		light: 'text-default',
		dark: 'text-default',
		pink: 'text-pink'
	},
	tonal: {
		default: 'text-default',
		primary: 'text-primary',
		secondary: 'text-secondary',
		accent: 'text-accent',
		success: 'text-success',
		warning: 'text-default',
		danger: 'text-danger',
		info: 'text-info',
		white: 'text-white',
		light: 'text-default',
		dark: 'text-default',
		pink: 'text-pink'
	},
	text: {
		default: 'text-default',
		primary: 'text-primary',
		secondary: 'text-secondary',
		accent: 'text-accent',
		success: 'text-success',
		warning: 'text-warning',
		danger: 'text-danger',
		info: 'text-info',
		white: 'text-white',
		light: 'text-default',
		dark: 'text-white',
		pink: 'text-pink'
	},
	plain: {
		default: 'text-default',
		primary: 'text-primary',
		secondary: 'text-secondary',
		accent: 'text-accent',
		success: 'text-success',
		warning: 'text-warning',
		danger: 'text-danger',
		info: 'text-info',
		white: 'text-white',
		light: 'text-default',
		dark: 'text-white',
		pink: 'text-pink'
	}
}

export const useTextVariant = (variant: ExtendedVariant, color: ExtendedColor) => textVariantMap[variant][color]
