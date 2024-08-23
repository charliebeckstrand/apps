<script setup lang="ts">
import Label from '@/components/form/Label.vue'

import { computed, toRefs } from 'vue'

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
	id?: string
	modelValue: string
	resize?: Resize
	rounded?: BorderRadius
	rows?: number | string
	size?: Size
	variant?: Variant
}

const emit = defineEmits<Emit>()

const props = withDefaults(defineProps<Props>(), {
	id: undefined,
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
	set: (value) => emit('update:modelValue', value)
})

const id = props.id ? props.id : `textarea-${useId()}`
</script>

<template>
	<div class="flex w-full flex-col">
		<Label
			:for="id"
			:class="{ hidden: !$slots.label }"
		>
			<slot name="label" />
		</Label>
		<textarea
			:id="id"
			ref="textareaRef"
			v-model="inputValue"
			v-bind="$attrs"
			:class="[
				'flex min-h-[56px] w-full resize-none rounded-md',
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
	</div>
</template>
