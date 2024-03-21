import type { Color } from '@/types/sidebar'

const colorMap: Record<Color, string> = {
	default: 'bg-default',
	primary: 'bg-primary',
	secondary: 'bg-secondary',
	accent: 'bg-accent',
	success: 'bg-success',
	danger: 'bg-danger',
	warning: 'bg-warning',
	info: 'bg-info',
	white: 'bg-white',
	light: 'bg-light',
	dark: 'bg-dark'
}

export const useColor = (color: Color): string => {
	if (!(color in colorMap)) {
		throw new Error(`Color "${color}" is not supported`)
	}

	return colorMap[color]
}
