import inputVariantMap from '@/common/maps/input-variant'

import type { Variant } from '@/types/form/input'

export const useInputVariant = (variant: Variant) => {
	const inputVariants: Record<Variant, string> = inputVariantMap

	return inputVariants[variant]
}
