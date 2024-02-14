<script setup lang="ts">
import { computed } from 'vue'

import { ChevronDownIcon } from '@heroicons/vue/24/solid'

import { paddingMap } from '@/constants/mapping'

import type { Padding } from '@/types/base/padding'

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
}

const emit = defineEmits<Emit>()

const props = withDefaults(defineProps<Props>(), {
	modelValue: undefined,
	items: undefined,
	placeholder: undefined,
	padding: 'md'
})

const inputValue = computed<ModelValue>({
	get: () => props.modelValue,
	set: (value) => emit('update:modelValue', value)
})

const classes = computed<string>(() => {
	const classes = ['bg-gray-100 flex w-full rounded-md resize-none appearance-none pr-10']

	if (props.padding) {
		classes.push(paddingMap[props.padding])
	}

	return classes.join(' ')
})
</script>

<template>
	<div class="relative">
		<select
			:id="props.id"
			v-model="inputValue"
			:class="classes"
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
			<UIIcon
				:icon="ChevronDownIcon"
				size="sm"
			/>
		</div>
	</div>
</template>
