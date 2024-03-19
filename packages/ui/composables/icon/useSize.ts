import type { Size } from '@/types/dialog'

const sizeMap: Record<string, string> = {
	xs: 'w-4 h-4',
	sm: 'w-5 h-5',
	md: 'w-6 h-6',
	lg: 'w-7 h-7'
}

export const useSize = (size: Size) => sizeMap[size]
