import type { Color } from '@/types/sidebar'

type ExtendedColor = Color | 'transparent'

const colorMap: Partial<Record<ExtendedColor, string>> = {
	primary: 'bg-primary',
	secondary: 'bg-secondary',
	accent: 'bg-accent',
	dark: 'bg-dark',
	transparent: 'bg-transparent'
}

export const useColor = (color: ExtendedColor): string => {
	if (!(color in colorMap)) {
		throw new Error(`color "${color}" does not exist`)
	}

	return colorMap[color] || ''
}
