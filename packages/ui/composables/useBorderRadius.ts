import type { BorderRadius } from '@/types/base/border-radius'

const borderRadiusMap: Record<BorderRadius, string> = {
	sm: 'rounded-sm',
	md: 'rounded-md',
	lg: 'rounded-lg',
	full: 'rounded-full',
	none: 'rounded-none'
}

export const useBorderRadius = (borderRadius: BorderRadius) => borderRadiusMap[borderRadius]
