import variantMap from '@/common/maps/variant'

import type { Color } from '@/types/base/color'
import type { Variant } from '@/types/base/variant'

export const useVariant = (variant: Variant) => {
	const variants: Record<Variant, Record<Color, string>> = variantMap

	return variants[variant]
}
