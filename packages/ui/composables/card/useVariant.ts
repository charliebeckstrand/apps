import type { Color } from '@/types/base/color'
import type { Variant } from '@/types/base/variant'

const variantMap: Record<Variant, Record<Color, { default: string; interactive?: string; active?: string }>> = {
	default: {
		default: {
			default: 'bg-gray-100 text-default',
			interactive: 'hover:bg-gray-200',
			active: 'bg-gray-200 hover:bg-gray-200'
		},
		primary: {
			default: 'bg-primary text-white',
			interactive: 'hover:bg-primary/90',
			active: 'bg-primary/50 hover:bg-primary/50'
		},
		secondary: {
			default: 'bg-secondary text-white',
			interactive: 'hover:bg-secondary/90',
			active: 'bg-secondary/50 hover:bg-secondary/50'
		},
		accent: {
			default: 'bg-accent text-white',
			interactive: 'hover:bg-accent/90',
			active: 'bg-accent/50 hover:bg-accent/50'
		},
		success: {
			default: 'bg-success text-white',
			interactive: 'hover:bg-success/90',
			active: 'bg-success/50 hover:bg-success/50'
		},
		warning: {
			default: 'bg-warning text-default',
			interactive: 'hover:bg-warning/90',
			active: 'bg-warning/50 hover:bg-warning/50'
		},
		danger: {
			default: 'bg-danger text-white',
			interactive: 'hover:bg-danger/90',
			active: 'bg-danger/50 hover:bg-danger/50'
		},
		info: {
			default: 'bg-info text-white',
			interactive: 'hover:bg-info/90',
			active: 'bg-info/50 hover:bg-info/50'
		},
		white: {
			default: 'bg-white text-default',
			interactive: 'hover:bg-gray-100',
			active: 'bg-white'
		},
		light: {
			default: 'bg-gray-200 text-default',
			interactive: 'hover:bg-gray-300',
			active: 'bg-gray-300 hover:bg-gray-300'
		},
		dark: {
			default: 'bg-gray-800 text-white',
			interactive: 'hover:bg-gray-900',
			active: 'bg-gray-900 hover:bg-gray-900'
		}
	},
	outlined: {
		default: {
			default: 'bg-transparent border border-default text-default',
			interactive: 'hover:bg-gray-200',
			active: 'bg-gray-200'
		},
		primary: {
			default: 'bg-transparent border border-primary text-primary',
			interactive: 'hover:bg-primary/10',
			active: 'bg-primary/10'
		},
		secondary: {
			default: 'bg-transparent border border-secondary text-secondary',
			interactive: 'hover:bg-secondary/10',
			active: 'bg-secondary/10'
		},
		accent: {
			default: 'bg-transparent border border-accent text-accent',
			interactive: 'hover:bg-accent/10',
			active: 'bg-accent/10'
		},
		success: {
			default: 'bg-transparent border border-success text-success',
			interactive: 'hover:bg-success/10',
			active: 'bg-success/10'
		},
		warning: {
			default: 'bg-transparent border border-warning text-default',
			interactive: 'hover:bg-warning/10',
			active: 'bg-warning/10'
		},
		danger: {
			default: 'bg-transparent border border-danger text-danger',
			interactive: 'hover:bg-danger/10',
			active: 'bg-danger/10'
		},
		info: {
			default: 'bg-transparent border border-info text-info',
			interactive: 'hover:bg-info/10',
			active: 'bg-info/10'
		},
		white: {
			default: 'bg-white border border-white text-default',
			interactive: 'hover:bg-white',
			active: 'bg-white'
		},
		light: {
			default: 'bg-transparent border border-gray-200 text-default',
			interactive: 'hover:bg-gray-300',
			active: 'bg-gray-300'
		},
		dark: {
			default: 'bg-transparent border border-gray-800 text-white',
			interactive: 'hover:bg-gray-900',
			active: 'bg-gray-900'
		}
	},
	tonal: {
		default: {
			default: 'bg-gray-50 text-default',
			interactive: 'hover:bg-gray-200',
			active: 'bg-gray-200 hover:bg-gray-200'
		},
		primary: {
			default: 'bg-primary/10 text-primary',
			interactive: 'hover:bg-primary/20',
			active: 'bg-primary/50 hover:bg-primary/50'
		},
		secondary: {
			default: 'bg-secondary/10 text-secondary',
			interactive: 'hover:bg-secondary/20',
			active: 'bg-secondary/50 hover:bg-secondary/50'
		},
		accent: {
			default: 'bg-accent/10 text-accent',
			interactive: 'hover:bg-accent/20',
			active: 'bg-accent/50 hover:bg-accent/50'
		},
		success: {
			default: 'bg-success/10 text-success',
			interactive: 'hover:bg-success/20',
			active: 'bg-success/50 hover:bg-success/50'
		},
		warning: {
			default: 'bg-warning/10 text-default',
			interactive: 'hover:bg-warning/20',
			active: 'bg-warning/50 hover:bg-warning/50'
		},
		danger: {
			default: 'bg-danger/10 text-danger',
			interactive: 'hover:bg-danger/20',
			active: 'bg-danger/50 hover:bg-danger/50'
		},
		info: {
			default: 'bg-info/10 text-info',
			interactive: 'hover:bg-info/20',
			active: 'bg-info/50 hover:bg-info/50'
		},
		white: {
			default: 'bg-white text-default',
			interactive: 'hover:bg-gray-200',
			active: 'bg-gray-500 hover:bg-gray-500'
		},
		light: {
			default: 'bg-gray-200 text-default',
			interactive: 'hover:bg-gray-300',
			active: 'bg-gray-300 hover:bg-gray-300'
		},
		dark: {
			default: 'bg-gray-800 text-white',
			interactive: 'hover:bg-gray-900',
			active: 'bg-gray-900 hover:bg-gray-900'
		}
	},
	plain: {
		default: {
			default: 'transparent text-default',
			interactive: 'hover:bg-gray-200',
			active: 'bg-gray-200 hover:bg-gray-200'
		},
		primary: {
			default: 'transparent text-primary',
			interactive: 'hover:bg-primary/10',
			active: 'bg-primary/20 hover:bg-primary/20'
		},
		secondary: {
			default: 'transparent text-secondary',
			interactive: 'hover:bg-secondary/10',
			active: 'bg-secondary/10 hover:bg-secondary/10'
		},
		accent: {
			default: 'transparent text-accent',
			interactive: 'hover:bg-accent/10',
			active: 'bg-accent/20 hover:bg-accent/20'
		},
		success: {
			default: 'transparent text-success',
			interactive: 'hover:bg-success/10',
			active: 'bg-success/10 hover:bg-success/10'
		},
		warning: {
			default: 'transparent text-default',
			interactive: 'hover:bg-warning/10',
			active: 'bg-warning/10 hover:bg-warning/10'
		},
		danger: {
			default: 'transparent text-danger',
			interactive: 'hover:bg-danger/10',
			active: 'bg-danger/10 hover:bg-danger/10'
		},
		info: {
			default: 'transparent text-info',
			interactive: 'hover:bg-info/10',
			active: 'bg-info/10 hover:bg-info/10'
		},
		white: {
			default: 'transparent text-default',
			interactive: 'hover:bg-gray-200',
			active: 'bg-gray-200 hover:bg-gray-200'
		},
		light: {
			default: 'transparent text-default',
			interactive: 'hover:bg-gray-300',
			active: 'bg-gray-300 hover:bg-gray-300'
		},
		dark: {
			default: 'transparent text-white',
			interactive: 'hover:bg-gray-900',
			active: 'bg-gray-900 hover:bg-gray-900'
		}
	}
}

export const useVariant = (variant: Variant, color: Color) => {
	if (!(variant in variantMap)) {
		throw new Error(`variant "${variant}" does not exist`)
	}

	if (!(color in variantMap[variant]!)) {
		throw new Error(`color "${color}" does not exist for variant "${variant}"`)
	}

	const { default: defaultVariant, interactive, active } = variantMap[variant][color]

	return { defaultVariant, interactive, active }
}
