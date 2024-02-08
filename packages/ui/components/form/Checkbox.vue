<script setup lang="ts">
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
	id: '',
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

const baseClasses = computed<string>(() => 'cursor-pointer rounded focus:outline-offset-0')

const colorClasses = computed<string | undefined>(() => {
	const colorMap: Record<string, string | undefined> = {
		primary: 'accent-primary checked:bg-primary',
		secondary: 'accent-secondary checked:bg-secondary',
		accent: 'accent-accent checked:bg-accent'
	}

	return colorMap[props.color]
})

const sizeClasses = computed<string | undefined>(() => {
	const sizeMap: Record<string, string | undefined> = {
		sm: 'h-4 w-4 text-sm',
		md: 'h-5 w-5 text-base',
		lg: 'h-6 w-6 text-lg'
	}

	return sizeMap[props.size]
})
</script>

<template>
	<div class="flex items-center space-x-2">
		<input
			:id="props.id"
			type="checkbox"
			v-model="inputValue"
			:class="[baseClasses, colorClasses, sizeClasses]"
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
