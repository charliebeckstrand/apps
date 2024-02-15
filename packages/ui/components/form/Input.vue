<script setup lang="ts">
import { useBorderRadius } from '@/composables/useBorderRadius'
import { useInput } from '@/composables/useInput'
import { usePadding } from '@/composables/usePadding'
import { useTextSize } from '@/composables/useTextSize'

import { computed } from 'vue'

import type { BorderRadius, Size, Variant } from '@/types/form/input'

type ModelValue = string | number

type Emit = {
	(event: 'update:modelValue', value: ModelValue): void
}

interface Props {
	modelValue?: ModelValue
	variant?: Variant
	size?: Size
	rounded?: BorderRadius
	autocomplete?: string
}

const emit = defineEmits<Emit>()

const props = withDefaults(defineProps<Props>(), {
	modelValue: '',
	variant: 'default',
	size: 'md',
	rounded: 'md',
	autocomplete: 'one-time-code'
})

const inputValue = computed<ModelValue>({
	get: () => props.modelValue,
	set: (value) => {
		emit('update:modelValue', value)
	}
})

const classes = computed<string>(() => {
	const classes = ['flex w-full']

	if (props.rounded) {
		classes.push(useBorderRadius(props.rounded))
	}

	if (props.size) {
		classes.push(usePadding(props.size))
		classes.push(useTextSize(props.size))
	}

	if (props.variant) {
		classes.push(useInput(props.variant))
	}

	return classes.join(' ')
})
</script>

<template>
	<input
		v-model="inputValue"
		:class="classes"
		:autocomplete="props.autocomplete"
	/>
</template>
