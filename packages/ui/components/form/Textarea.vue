<script setup lang="ts">
import { useBorderRadius } from '@/composables/useBorderRadius'
import { useInput } from '@/composables/useInput'
import { usePadding } from '@/composables/usePadding'
import { useResize } from '@/composables/useResize'
import { useTextSize } from '@/composables/useTextSize'

import { computed } from 'vue'

import type { BorderRadius, Resize, Size, Variant } from '@/types/form/textarea'

type Emit = {
	(event: 'update:modelValue', value: string): void
}

interface Props {
	modelValue: string
	rounded?: BorderRadius
	resize?: Resize
	rows?: number | string
	size?: Size
	variant?: Variant
}

const emit = defineEmits<Emit>()

const props = withDefaults(defineProps<Props>(), {
	modelValue: '',
	rounded: 'md',
	resize: 'none',
	rows: 4,
	size: 'md',
	variant: 'default'
})

const inputValue = computed<string>({
	get: () => props.modelValue,
	set: (value) => {
		emit('update:modelValue', value)
	}
})

const classes = computed<string>(() => {
	const classes = ['flex w-full rounded-md resize-none min-h-[48px]']

	if (props.rounded) {
		classes.push(useBorderRadius(props.rounded))
	}

	if (props.resize) {
		classes.push(useResize(props.resize))
	}

	if (props.size) {
		classes.push(usePadding(props.size))
		classes.push(useTextSize(props.size))
	}

	if (props.variant) {
		const variant = useInput(props.variant)

		if (variant) {
			classes.push(variant)
		}
	}

	return classes.join(' ')
})
</script>

<template>
	<textarea
		v-model="inputValue"
		:class="classes"
		:rows="props.rows"
	/>
</template>

<style lang="scss" scoped></style>
