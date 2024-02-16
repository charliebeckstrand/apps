import type { BorderRadius } from './base/border-radius'
import type { Color } from './base/color'
import type { Justify } from './base/justify'
import type { Size } from './base/size'
import type { Variant } from './base/variant'

type ExtendedColor = Color | 'pink'
type ExtendedVariant = Variant | 'text'

export type { BorderRadius, ExtendedColor as Color, Justify, Size, ExtendedVariant as Variant }
