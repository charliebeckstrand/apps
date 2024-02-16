import textSizeMap from '@/maps/text-size'

import type { TextSize } from '@/types/base/text-size'

export const useTextSize = (textSize: TextSize) => {
	const textSizes: Record<TextSize, string> = textSizeMap

	return textSizes[textSize]
}
