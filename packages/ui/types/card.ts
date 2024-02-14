import type { BorderRadius } from './base/border-radius'
import type { Padding } from './base/padding'
import type { Size } from './base/size'
import type { Variant } from './base/variant'

import type { Color } from './base/color'

// type Color = 'default' | 'primary' | 'secondary' | 'accent' | 'white'
type ExtendedVariant = Variant | 'plain'

export type { BorderRadius, Color, Padding, Size, ExtendedVariant as Variant }
