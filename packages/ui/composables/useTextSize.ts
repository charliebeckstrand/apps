import type { TextSize } from '@/types/base/text-size'

export const useTextSize = (textSize: TextSize) => {
	const textSizeMap: Record<TextSize, string> = {
		xs: 'text-xs',
		sm: 'text-sm',
		md: 'text-base',
		lg: 'text-lg',
		xl: 'text-xl',
		'2xl': 'text-2xl',
		'3xl': 'text-3xl',
		'4xl': 'text-4xl'
	}

	return textSizeMap[textSize]
}
