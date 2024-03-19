import type { Color } from '@/types/base/color'

const backgroundColorMap: Record<Color, string> = {
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

export const useBackgroundColor = (color: Color) => backgroundColorMap[color]
