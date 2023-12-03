<script setup lang="ts">
import { computed } from 'vue'

import { ChevronDownIcon } from '@heroicons/vue/24/solid'

interface Item {
	label: string
	value: string | number
}

interface Props {
	modelValue?: string | number
	items: Item[]
	placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: undefined,
	items: undefined,
	placeholder: undefined
})

const baseClasses = computed<string>(() => {
	const classes = 'bg-gray-100 flex w-full rounded-md p-3 resize-none appearance-none pr-10'

	return classes
})

const emit = defineEmits(['update:modelValue'])

const value = computed<string | number | undefined>({
	get() {
		return props.modelValue
	},
	set(value) {
		emit('update:modelValue', value)
	}
})
</script>

<template>
	<div class="relative">
		<select
			v-model="value"
			:class="[baseClasses]"
			@input="emit('update:modelValue', value)"
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

<style scoped lang="scss"></style>
