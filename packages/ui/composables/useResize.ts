import type { Resize } from '@/types/base/resize'

export const useResize = (resize: Resize) => {
	const resizeMap: Record<Resize, string> = {
		none: 'resize-none',
		vertical: 'resize-y',
		horizontal: 'resize-x',
		both: 'resize'
	}

	return resizeMap[resize]
}
