import type { Padding } from '@/types/base/padding'

export const usePadding = (padding: Padding) => {
	const paddingMap: Record<Padding, string> = {
		sm: 'p-3',
		md: 'p-4',
		lg: 'p-5',
		none: 'p-0'
	}

	return paddingMap[padding]
}
