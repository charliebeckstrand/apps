import type { Justify } from '@/types/base/justify'

const justifyMap: Record<Justify, string> = {
	start: 'justify-start',
	center: 'justify-center',
	end: 'justify-end',
	'space-around': 'justify-around',
	'space-between': 'justify-between',
	'space-evenly': 'justify-evenly'
}

export const useJustify = (justify: Justify) => {
	if (!(justify in justifyMap)) {
		throw new Error(`Justify "${justify}" is not supported`)
	}

	return justifyMap[justify]
}
