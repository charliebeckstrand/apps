import type { Color } from '@/types/form/checkbox'

const colorMap: Record<string, string> = {
	primary: 'accent-primary checked:bg-primary',
	secondary: 'accent-secondary checked:bg-secondary',
	accent: 'accent-accent checked:bg-accent'
}

export const useColor = (color: Color) => colorMap[color]
