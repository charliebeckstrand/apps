<script setup lang="ts">
import { computed } from 'vue'

import type { Color, Size, Variant } from '@/types/alert'

interface Props {
	color?: Color
	variant?: Variant
	size?: Size
	dark?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	color: 'default',
	variant: 'default',
	size: 'md',
	dark: false
})

const baseClasses = computed<string>(() => `rounded-md ${props.dark ? 'text-white' : undefined}`)

const colorClasses = computed(() => {
	const variantMap: Record<Variant, Record<Color, string>> = {
		default: {
			default: 'bg-gray-100 text-white',
			primary: 'bg-primary text-white',
			secondary: 'bg-secondary text-white',
			accent: 'bg-accent text-white',
			success: 'bg-success text-white',
			warning: 'bg-warning text-base',
			danger: 'bg-danger text-white',
			info: 'bg-info text-white'
		},
		outlined: {
			default: 'bg-transparent border border-gray-100 text-base',
			primary: 'bg-transparent border border-primary text-primary',
			secondary: 'bg-transparent border border-secondary text-secondary ',
			accent: 'bg-transparent border border-accent text-accent',
			success: 'bg-transparent border border-success text-success',
			warning: 'bg-transparent border border-warning text-base',
			danger: 'bg-transparent border border-danger text-danger',
			info: 'bg-transparent border border-info text-info'
		},
		tonal: {
			default: 'bg-gray-100/50 text-base',
			primary: 'bg-primary/10 text-primary',
			secondary: 'bg-secondary/10 text-secondary',
			accent: 'bg-accent/10 text-accent',
			success: 'bg-success/10 text-success',
			warning: 'bg-warning/10 text-base',
			danger: 'bg-danger/10 text-danger',
			info: 'bg-info/10 text-info'
		}
	}

	return variantMap[props.variant]?.[props.color]
})

const paddingClasses = computed(() => {
	const sizeMap: Record<Size, string> = {
		sm: 'p-2',
		md: 'p-3',
		lg: 'p-4'
	}

	return sizeMap[props.size]
})
</script>

<template>
	<div :class="[baseClasses, colorClasses, paddingClasses]">
		<div
			v-if="$slots['title']"
			class="text-lg font-bold"
		>
			<slot name="title" />
		</div>
		<slot />
	</div>
</template>
