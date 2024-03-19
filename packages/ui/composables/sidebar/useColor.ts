import type { Color } from '@/types/sidebar'

const colorMap: Record<Color, string> = {
	primary: 'bg-primary',
	secondary: 'bg-secondary',
	accent: 'bg-accent',
	transparent: 'bg-transparent'
}

export const useColor = (color: Color): string => {
	if (!(color in colorMap)) {
		throw new Error(`Color "${color}" is not supported`)
	}

	return colorMap[color]
}
