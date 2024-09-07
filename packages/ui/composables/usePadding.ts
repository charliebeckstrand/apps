import type { Padding } from '@/types/base/padding'

const paddingMap: Record<Padding, string> = {
	sm: 'p-2',
	md: 'p-3',
	lg: 'p-4',
	none: 'p-0'
}

export const usePadding = (padding: Padding) => paddingMap[padding]
