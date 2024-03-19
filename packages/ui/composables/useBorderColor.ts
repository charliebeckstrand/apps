import type { Color } from '@/types/base/color'

const borderColorMap: Record<Color, string> = {
	default: 'border-gray-100',
	primary: 'border-primary',
	secondary: 'border-secondary',
	accent: 'border-accent',
	success: 'border-success',
	warning: 'border-warning',
	danger: 'border-danger',
	info: 'border-info',
	white: 'border-white',
	light: 'border-light',
	dark: 'border-dark'
}

export const useBorderColor = (color: Color) => borderColorMap[color]
