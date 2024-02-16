import justifyMap from '@/common/maps/justify'

import type { Justify } from '@/types/base/justify'

export const useJustify = (value: Justify) => {
	const justify: Record<Justify, string> = justifyMap

	return justify[value]
}
