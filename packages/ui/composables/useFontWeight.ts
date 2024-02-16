import fontWeightMap from '@/common/tailwind-class-maps/font-weight'

import type { FontWeight } from '@/types/base/font-weight'

export const useFontWeight = (fontWeight: FontWeight) => {
	const fontWeights: Record<FontWeight, string> = fontWeightMap

	return fontWeights[fontWeight]
}
