import type { Variant } from '@/types/form/input'

export const variantMap: Record<Variant, string> = {
	default: 'bg-gray-100',
	outlined: 'border border-gray-300',
	tonal: 'bg-gray-50',
	plain: 'bg-transparent'
}
