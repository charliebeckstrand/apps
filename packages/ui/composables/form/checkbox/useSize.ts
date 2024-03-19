import type { Size } from '@/types/form/checkbox'

const sizeMap: Record<Size, string> = {
	sm: 'h-4 w-4',
	md: 'h-5 w-5',
	lg: 'h-6 w-6'
}

export const useSize = (size: Size) => sizeMap[size]
