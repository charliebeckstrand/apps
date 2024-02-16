import type { Variant } from '@/types/form/input'

export const useInputVariant = (variant: Variant) => {
	const inputVariantMap: Record<Variant, string> = {
		default: 'bg-gray-100',
		outlined: 'border border-gray-300',
		tonal: 'bg-gray-50',
		plain: 'bg-transparent'
	}

	return inputVariantMap[variant]
}
