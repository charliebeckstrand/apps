import type { Orientation } from '@/types/base/orientation'

const orientationMap: Record<Orientation, string> = {
	horizontal: 'flex items-center flex-row horizontal',
	vertical: 'flex flex-col vertical'
}

export const useOrientation = (orientation: Orientation) => orientationMap[orientation]
