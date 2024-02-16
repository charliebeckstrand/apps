import resizeMap from '@/common/tailwind-class-maps/resize'

import type { Resize } from '@/types/base/resize'

export const useResize = (value: Resize) => {
	const resize: Record<Resize, string> = resizeMap

	return resize[value]
}
