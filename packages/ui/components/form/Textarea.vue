<script setup lang="ts">
import { computed } from 'vue'

import { useBorderRadius } from '@/composables/useBorderRadius'
import { useTailwindClasses } from '@/composables/useTailwindClasses'
import { usePadding } from '@/composables/usePadding'
import { useResize } from '@/composables/useResize'
import { useTextSize } from '@/composables/useTextSize'
import { useVariant } from '@/composables/form/useVariant'

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
</script>

<template>
	<textarea
		v-model="inputValue"
		:class="[
			useTailwindClasses([
				useBorderRadius(props.rounded),
				useResize(props.resize),
				usePadding(props.size),
				useTextSize(props.size),
				useVariant(props.variant)
			]),
			'flex min-h-[48px] w-full resize-none rounded-md'
		]"
		:rows="props.rows"
	/>
</template>

<style lang="scss" scoped></style>
