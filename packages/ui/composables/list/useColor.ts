import type { Color } from '@/types/list'

const colorMap: Partial<Record<Color, string>> = {
	default: 'bg-transparent',
	primary: 'text-primary',
	secondary: 'text-secondary',
	accent: 'text-accent'
}

export const useColor = (color: Color): string => {
	// Check if the color exists in the map
	if (!colorMap[color]) {
		throw new Error(`color ${color} does not exist`)
	}

	return colorMap[color] || ''
}
