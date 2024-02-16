import borderRadiusMap from '@/common/maps/border-radius'

import type { BorderRadius } from '@/types/base/border-radius'

export const useBorderRadius = (borderRadius: BorderRadius) => {
	const borderRadiuses: Record<BorderRadius, string> = borderRadiusMap

	return borderRadiuses[borderRadius]
}
