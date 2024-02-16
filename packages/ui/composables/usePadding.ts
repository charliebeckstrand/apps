import paddingMap from '@/maps/padding'

import type { Padding } from '@/types/base/padding'

export const usePadding = (padding: Padding) => {
	const paddings: Record<Padding, string> = paddingMap

	return paddings[padding]
}
