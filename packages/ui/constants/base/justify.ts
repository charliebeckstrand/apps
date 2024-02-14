import type { Justify } from '@/types/base/justify'

export const justifyMap: Record<Justify, string> = {
	start: 'justify-start',
	center: 'justify-center',
	end: 'justify-end',
	'space-around': 'justify-around',
	'space-between': 'justify-between',
	'space-evenly': 'justify-evenly'
}
