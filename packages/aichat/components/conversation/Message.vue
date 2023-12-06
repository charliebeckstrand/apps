<script setup lang="ts">
import type { Message } from '@/types/message'

type Color = 'primary' | 'secondary' | 'accent' | 'gray'
type Variant = 'default' | 'outlined' | 'tonal'

interface Props {
	message: Message
	color?: Color
	variant?: Variant
}

const props = withDefaults(defineProps<Props>(), {
	message: undefined,
	color: 'gray',
	variant: 'default'
})

const setRef = (component: any) => {
	nextTick(() => {
		if (!component) return

		component.scrollIntoViewIfNeeded()
	})
}

// const colorClasses = computed(() => {
// 	return {
// 		'bg-gray-600': props.message.type === 'bot' || props.message.type === 'system',
// 		'bg-accent': props.message.type === 'user'
// 	}
// })

const baseClasses = computed<string>(() => {
	const classes = `max-w-[640px] justify-self-end break-all rounded-lg p-3 border ${
		'border-transparent' ? props.variant !== 'outlined' : null
	}}`

	return classes
})

const colorClasses = computed<string | undefined>(() => {
	const variants: Record<Variant, Record<Color, string>> = {
		default: {
			primary: 'bg-primary text-white',
			secondary: 'bg-secondary text-white',
			accent: 'bg-accent text-white',
			gray: 'bg-gray-600 text-white'
		},
		outlined: {
			primary: 'border-primary text-primary',
			secondary: 'border-secondary text-secondary',
			accent: 'border-accent text-accent',
			gray: 'border-gray-600 text-gray-600'
		},
		tonal: {
			primary: 'bg-primary/10',
			secondary: 'bg-secondary/10',
			accent: 'bg-accent/10',
			gray: 'bg-gray-600/10'
		}
	} as const

	return props.color ? variants[props.variant][props.color] : undefined
})
</script>

<template>
	<div
		:ref="setRef"
		:class="[
			baseClasses,
			colorClasses,
			{
				'ml-12': props.message.type === 'bot' || props.message.type === 'system',
				'mr-12': props.message.type === 'user'
			}
		]"
	>
		<div v-html="props.message.value" />
	</div>
</template>
