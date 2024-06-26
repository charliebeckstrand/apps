<script setup lang="ts">
import Icon from '@/components/icon/Index.vue'

import { computed, toRefs } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/24/solid'

import { usePadding } from '@/composables/usePadding'
import { useTailwindClasses } from '@/composables/useTailwindClasses'
import { useVariant } from '@/composables/form/useVariant'

import type { Padding } from '@/types/base/padding'
import type { Variant } from '@/types/form/input'

type ModelValue = string | number | undefined

type Emit = {
	(event: 'update:modelValue', value: ModelValue): void
	(event: 'change'): void
}

type Item = {
	disabled?: boolean | undefined
	label: string
	value: string | number
}

interface Props {
	id?: string
	items: number[] | string[] | Item[]
	modelValue: ModelValue
	padding?: Padding
	placeholder?: string
	variant?: Variant
}

const emit = defineEmits<Emit>()

const props = withDefaults(defineProps<Props>(), {
	id: undefined,
	items: undefined,
	modelValue: undefined,
	placeholder: undefined,
	padding: 'md',
	variant: 'default'
})

const { id, items, modelValue, padding, placeholder, variant } = toRefs(props)

const inputValue = computed<ModelValue>({
	get: () => modelValue.value,
	set: (value) => emit('update:modelValue', value)
})

const getItemValue = (item: number | string | Item): string | number => {
	if (typeof item === 'object') {
		return item.value
	}
	return item
}

const getItemDisabled = (item: number | string | Item): boolean => {
	if (typeof item === 'object') {
		return item.disabled ?? false
	}
	return false
}

const getItemLabel = (item: number | string | Item): number | string => {
	if (typeof item === 'object') {
		return item.label
	}
	return item
}
</script>

<template>
	<div class="relative">
		<select
			:id="id"
			v-model="inputValue"
			:class="[
				'flex w-full resize-none appearance-none rounded-md pr-10',
				useTailwindClasses([usePadding(padding), useVariant(variant)])
			]"
			@change="$emit('change')"
		>
			<option
				:value="undefined || null"
				disabled
				selected
			>
				{{ placeholder ?? 'Select an option' }}
			</option>
			<option
				v-for="(item, index) in items"
				:key="index"
				:value="getItemValue(item)"
				:disabled="getItemDisabled(item)"
			>
				{{ getItemLabel(item) }}
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
