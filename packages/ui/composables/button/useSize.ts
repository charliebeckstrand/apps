import type { Size } from '@/types/base/size'

const sizeMap = {
	sm: { text: 'text-sm', padding: 'px-2 py-1 min-h-8', icon: 'h-8 w-8' },
	md: { text: 'text-base', padding: 'px-4 py-2 min-h-10', icon: 'h-10 w-10' },
	lg: { text: 'text-lg', padding: 'px-6 py-3 min-h-14', icon: 'h-12 w-12' }
}

export const useSize = (size: Size) => {
	const { text, padding, icon } = sizeMap[size]

	return { text, padding, icon }
}
