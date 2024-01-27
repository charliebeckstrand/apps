<script setup lang="ts">
import { computed } from 'vue'

import type { Color, Variant } from '@/types/navbar'

interface Props {
	color?: Color
	variant?: Variant
}

const props = withDefaults(defineProps<Props>(), {
	color: 'primary',
	variant: 'default'
})

const baseClasses = computed<string>(() => 'flex items-center p-4 leading-tight')

const variantClasses = computed<string | undefined>(() => {
	const variantMap: Record<Variant, Record<Color, string>> = {
		default: {
			primary: 'bg-primary text-white',
			secondary: 'bg-secondary text-white',
			transparent: 'bg-transparent text-primary',
			dark: 'bg-[#333] text-white'
		}
	}

	return variantMap[props.variant][props.color]
})
</script>

<template>
	<nav :class="[baseClasses, variantClasses]">
		<div class="mr-auto">
			<slot name="left" />
		</div>

		<slot />

		<div class="ml-auto space-x-4">
			<slot name="right" />
		</div>
	</nav>
</template>
