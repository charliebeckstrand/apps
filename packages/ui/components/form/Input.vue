<script setup lang="ts">
import { computed } from 'vue'

import { useBorderRadius } from '@/composables/useBorderRadius'
import { useTailwindClasses } from '@/composables/useTailwindClasses'
import { usePadding } from '@/composables/usePadding'
import { useTextSize } from '@/composables/useTextSize'
import { useVariant } from '@/composables/form/useVariant'

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
</script>

<template>
	<input
		v-model="inputValue"
		:class="[
			useTailwindClasses([
				useBorderRadius(props.rounded),
				usePadding(props.size),
				useTextSize(props.size),
				useVariant(props.variant)
			]),
			'flex w-full'
		]"
		:autocomplete="props.autocomplete"
	/>
</template>
