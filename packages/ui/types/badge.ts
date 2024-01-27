import type { BorderRadius } from './tailwind/border-radius'
import type { Color } from './color'
import type { Size } from './size'
import type { Variant } from './variant'

type ExtendedVariant = Variant | 'ghost'

export type { BorderRadius, Color, Size, ExtendedVariant as Variant }
