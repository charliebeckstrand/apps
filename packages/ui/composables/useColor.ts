import type { Color } from '@/types/base/color'

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
		throw new Error(`color "${color}" does not exist`)
	}

	return colorMap[color]
}
