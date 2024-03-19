<script setup lang="ts">
import { computed } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/24/solid'

import { useTailwindClasses } from '@/composables/useTailwindClasses'
import { usePadding } from '@/composables/usePadding'
import { useVariant } from '@/composables/form/useVariant'

import Icon from '@/components/icon/Index.vue'

import type { Padding } from '@/types/base/padding'
import type { Variant } from '@/types/form/input'

type ModelValue = string | number | undefined

type Emit = {
	(event: 'update:modelValue', value: ModelValue): void
	(event: 'change'): void
}

type Item = {
	label: string
	value: string | number
	disabled: boolean
}

interface Props {
	id?: string
	modelValue: ModelValue
	items: Item[]
	placeholder?: string
	padding?: Padding
	variant?: Variant
}

const emit = defineEmits<Emit>()

const props = withDefaults(defineProps<Props>(), {
	modelValue: undefined,
	items: undefined,
	placeholder: undefined,
	padding: 'md',
	variant: 'default'
})

const inputValue = computed<ModelValue>({
	get: () => props.modelValue,
	set: (value) => emit('update:modelValue', value)
})
</script>

<template>
	<div class="relative">
		<select
			:id="props.id"
			v-model="inputValue"
			:class="[
				useTailwindClasses([usePadding(props.padding), useVariant(props.variant)]),
				'flex w-full resize-none appearance-none rounded-md pr-10'
			]"
			@change="$emit('change')"
		>
			<option
				:value="undefined || null"
				disabled
				selected
			>
				{{ props.placeholder ? props.placeholder : 'Select an option' }}
			</option>
			<option
				v-for="(item, index) in props.items"
				:key="index"
				:value="item.value"
				:disabled="item.disabled"
			>
				{{ item.label ? item.label : item }}
			</option>
		</select>

		<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
			<Icon
				:icon="ChevronDownIcon"
				size="sm"
			/>
		</div>
	</div>
</template>
