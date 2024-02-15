import type { Justify } from '@/types/base/justify'

export const useJustify = (value: Justify) => {
	const justifyMap: Record<Justify, string> = {
		start: 'justify-start',
		center: 'justify-center',
		end: 'justify-end',
		'space-around': 'justify-around',
		'space-between': 'justify-between',
		'space-evenly': 'justify-evenly'
	}

	return justifyMap[value]
}
