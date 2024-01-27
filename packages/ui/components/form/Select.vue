<script setup lang="ts">
import { computed } from 'vue'

import { ChevronDownIcon } from '@heroicons/vue/24/solid'

import type { Padding } from '@/types/padding'

type ModelValue = string | number | undefined

type Emit = {
	(event: 'update:modelValue', value: ModelValue): void
}

type Item = {
	label: string
	value: string | number
}

interface Props {
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
	get() {
		return props.modelValue
	},
	set(value) {
		emit('update:modelValue', value)
	}
})

const baseClasses = computed<string>(() => 'bg-gray-100 flex w-full rounded-md resize-none appearance-none pr-10')

const paddingClasses = computed<string>(() => {
	const paddingMap: Record<Padding, string> = {
		sm: 'p-2',
		md: 'p-3',
		lg: 'p-4',
		none: 'p-0'
	}

	return paddingMap[props.padding]
})
</script>

<template>
	<div class="relative">
		<select
			v-model="inputValue"
			:class="[baseClasses, paddingClasses]"
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
			>
				{{ item.label ? item.label : item }}
			</option>
		</select>

		<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
			<UIIcon
				:icon="ChevronDownIcon"
				size="xs"
			/>
		</div>
	</div>
</template>
