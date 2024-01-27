import type { BorderRadius } from './tailwind/border-radius'
import type { Padding } from './padding'
import type { Size } from './size'
import type { Variant } from './variant'

type Color = 'default' | 'primary' | 'secondary' | 'accent'
type ExtendedVariant = Variant | 'plain'

export type { BorderRadius, Color, Padding, Size, ExtendedVariant as Variant }
