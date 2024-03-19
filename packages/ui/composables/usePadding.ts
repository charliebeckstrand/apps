import type { Padding } from '@/types/base/padding'

const paddingMap: Record<Padding, string> = {
	sm: 'p-3',
	md: 'p-4',
	lg: 'p-5',
	none: 'p-0'
}

export const usePadding = (padding: Padding) => paddingMap[padding]
