<script setup lang="ts">
import { computed } from 'vue'

import { useBorderRadius } from '@/composables/useBorderRadius'
import { usePadding } from '@/composables/usePadding'
import { useResize } from '@/composables/useResize'
import { useTailwindClasses } from '@/composables/useTailwindClasses'
import { useTextSize } from '@/composables/useTextSize'
import { useVariant } from '@/composables/form/useVariant'

import type { BorderRadius, Resize, Size, Variant } from '@/types/form/textarea'

type Emit = {
	(event: 'update:modelValue', value: string): void
}

interface Props {
	modelValue: string
	resize?: Resize
	rounded?: BorderRadius
	rows?: number | string
	size?: Size
	variant?: Variant
}

const emit = defineEmits<Emit>()

const props = withDefaults(defineProps<Props>(), {
	modelValue: '',
	resize: 'none',
	rounded: 'md',
	rows: 4,
	size: 'md',
	variant: 'default'
})

const { modelValue, resize, rounded, rows, size, variant } = toRefs(props)

const inputValue = computed<string>({
	get: () => modelValue.value,
	set: (value) => {
		emit('update:modelValue', value)
	}
})
</script>

<template>
	<textarea
		v-model="inputValue"
		:class="[
			'flex min-h-[48px] w-full resize-none rounded-md',
			useTailwindClasses([
				useBorderRadius(rounded),
				useResize(resize),
				usePadding(size),
				useTextSize(size),
				useVariant(variant)
			])
		]"
		:rows="rows"
	/>
</template>
