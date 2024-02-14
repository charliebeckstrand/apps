<script setup lang="ts">
import { computed } from 'vue'

import { borderRadiusMap, paddingMap, textSizeMap } from '@/constants'
import { variantMap } from '@/constants/form/input'

import type { BorderRadius, Size, Variant } from '@/types/form/input'

type ModelValue = string | number

type Emit = {
	(event: 'update:modelValue', value: ModelValue): void
}

interface Props {
	modelValue?: ModelValue
	variant?: Variant
	size?: Size
	borderRadius?: BorderRadius
	autocomplete?: string
}

const emit = defineEmits<Emit>()

const props = withDefaults(defineProps<Props>(), {
	modelValue: '',
	variant: 'default',
	size: 'md',
	borderRadius: 'md',
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

	if (props.borderRadius) {
		classes.push(borderRadiusMap[props.borderRadius])
	}

	if (props.size) {
		classes.push(paddingMap[props.size])
		classes.push(textSizeMap[props.size])
	}

	if (props.variant) {
		classes.push(variantMap[props.variant])
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
