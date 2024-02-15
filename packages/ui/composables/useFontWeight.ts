import type { FontWeight } from '@/types/base/font-weight'

export const useFontWeight = (weight: FontWeight) => {
	const fontWeightMap: Record<FontWeight, string> = {
		thin: 'font-thin',
		extralight: 'font-extralight',
		light: 'font-light',
		normal: 'font-normal',
		medium: 'font-medium',
		semibold: 'font-semibold',
		bold: 'font-bold',
		extrabold: 'font-extrabold',
		black: 'font-black'
	}

	return fontWeightMap[weight]
}
