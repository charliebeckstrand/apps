import type { Color } from '@/types/base/color'

const textColorMap: Record<Color, string> = {
	default: 'text-default',
	primary: 'text-primary',
	secondary: 'text-secondary',
	accent: 'text-accent',
	success: 'text-success',
	warning: 'text-warning',
	danger: 'text-danger',
	info: 'text-info',
	white: 'text-white',
	light: 'text-light',
	dark: 'text-dark'
}

export const useTextColor = (color: Color) => textColorMap[color]
