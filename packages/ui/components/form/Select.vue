<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/24/solid'

import { usePadding } from '@/composables/usePadding'
import { useTailwindClasses } from '@/composables/useTailwindClasses'
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
	items: Item[]
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
