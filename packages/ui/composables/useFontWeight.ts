import type { FontWeight } from '@/types/base/font-weight'

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

export const useFontWeight = (fontWeight: FontWeight) => fontWeightMap[fontWeight]
