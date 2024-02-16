import textColorMap from '@/maps/text-color'

import type { Color } from '@/types/base/color'

export const useTextColor = (color: Color) => {
	const textColors: Record<Color, string> = textColorMap

	return textColors[color]
}
