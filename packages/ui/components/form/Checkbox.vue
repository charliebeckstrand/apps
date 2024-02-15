<script setup lang="ts">
import { useTextSize } from '@/composables/useTextSize'

import { computed } from 'vue'

import type { Color, Size } from '@/types/form/checkbox'

type Emit = {
	(event: 'update:modelValue', value: boolean): void
}

interface Props {
	id: string
	modelValue: boolean
	color?: Color
	size?: Size
}

const emit = defineEmits<Emit>()

const props = withDefaults(defineProps<Props>(), {
	id: undefined,
	modelValue: undefined,
	color: 'primary',
	size: 'md'
})

const inputValue = computed<boolean>({
	get: () => props.modelValue,
	set: (value: boolean) => {
		emit('update:modelValue', value)
	}
})

const toggleInput = () => {
	emit('update:modelValue', !inputValue.value)
}

const classes = computed<string>(() => {
	const classes = ['cursor-pointer rounded focus:outline-offset-0']

	const colorMap: Record<string, string | undefined> = {
		primary: 'accent-primary checked:bg-primary',
		secondary: 'accent-secondary checked:bg-secondary',
		accent: 'accent-accent checked:bg-accent'
	}

	const sizeMap: Record<string, string | undefined> = {
		sm: 'h-4 w-4',
		md: 'h-5 w-5',
		lg: 'h-6 w-6'
	}

	if (props.color) {
		const color = colorMap[props.color]

		if (color) {
			classes.push(color)
		}
	}

	if (props.size) {
		const size = sizeMap[props.size]

		if (size) {
			classes.push(size)
		}

		classes.push(useTextSize(props.size))
	}

	return classes.join(' ')
})
</script>

<template>
	<div class="flex items-center space-x-2">
		<input
			:id="props.id"
			type="checkbox"
			v-model="inputValue"
			:class="classes"
			@keydown.enter="toggleInput"
		/>
		<label
			:for="props.id"
			class="cursor-pointer select-none"
		>
			<slot />
		</label>
	</div>
</template>

<style lang="scss" scoped></style>
