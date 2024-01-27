import type { BorderRadius } from './border-radius'
import type { Color } from './color'
import type { Size } from './size'
import type { Variant } from './variant'

type ExtendedColor = Color | 'pink' | 'white'
type ExtendedVariant = Variant | 'text' | 'plain'

export type { BorderRadius, ExtendedColor as Color, Size, ExtendedVariant as Variant }
