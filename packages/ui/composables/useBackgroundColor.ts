import backgroundColorMap from '@/common/maps/background-color'

import type { Color } from '@/types/base/color'

export const useBackgroundColor = (color: Color) => {
	const backgroundColor: Record<Color, string> = backgroundColorMap

	return backgroundColor[color]
}
