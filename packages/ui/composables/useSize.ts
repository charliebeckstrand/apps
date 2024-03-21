import type { Size } from '@/types/dialog'

const sizeMap: Record<string, string> = {
	sm: 'w-5 h-5',
	md: 'w-6 h-6',
	lg: 'w-7 h-7'
}

export const useSize = (size: Size) => sizeMap[size]
