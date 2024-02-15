import type { Color } from '@/types/base/color'

export const useBackgroundColor = (color: Color) => {
	const backgroundColorMap: Record<Color, string> = {
		default: 'bg-default',
		primary: 'bg-primary',
		secondary: 'bg-secondary',
		accent: 'bg-accent',
		success: 'bg-success',
		warning: 'bg-warning',
		danger: 'bg-danger',
		info: 'bg-info',
		white: 'bg-white'
	}

	return backgroundColorMap[color]
}
