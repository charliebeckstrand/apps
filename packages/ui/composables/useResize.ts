import type { Resize } from '@/types/base/resize'

const resizeMap: Record<Resize, string> = {
	none: 'resize-none',
	vertical: 'resize-y',
	horizontal: 'resize-x',
	both: 'resize'
}

export const useResize = (resize: Resize) => resizeMap[resize]
