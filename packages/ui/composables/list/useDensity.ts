import type { Density } from '@/types/list'

const densityMap: Record<Density, string> = {
	default: 'default',
	comfortable: 'comfortable',
	compact: 'compact'
}

export const useDensity = (density: Density) => densityMap[density]
