import type { BorderRadius } from './base/border-radius'
import type { Color } from './base/color'
import type { Size } from './base/size'
import type { Variant } from './base/variant'

type ExtendedColor = Color | 'pink' | 'white'
type ExtendedVariant = Variant | 'text' | 'plain'

export type { BorderRadius, ExtendedColor as Color, Size, ExtendedVariant as Variant }
