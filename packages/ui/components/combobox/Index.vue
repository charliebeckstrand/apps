<script setup lang="ts">
import { ref, computed } from 'vue'

import { ChevronDownIcon, ChevronUpIcon, XMarkIcon } from '@heroicons/vue/24/solid'

import {
	Combobox,
	ComboboxInput,
	ComboboxButton,
	ComboboxOptions,
	ComboboxOption,
	TransitionRoot
} from '@headlessui/vue'

type Emit = {
	(event: 'update:modelValue', value: string): void
}

interface Props {
	id: string
	modelValue: string
	items: string[]
	placeholder?: string
	variant?: 'default' | 'outlined' | 'plain'
}

const emit = defineEmits<Emit>()

const props = withDefaults(defineProps<Props>(), {
	id: undefined,
	modelValue: undefined,
	items: undefined,
	placeholder: 'Select an item',
	variant: 'default'
})

const query = ref('')

const inputValue = computed({
	get: () => props.modelValue,
	set: (newValue) => {
		emit('update:modelValue', newValue)
	}
})

const filteredItems = computed(() =>
	props.items.filter((item) => item.toLowerCase().includes(query.value.toLowerCase()))
)
</script>

<template>
	<Combobox
		v-slot="{ open }"
		v-model="inputValue"
	>
		<div class="relative">
			<div class="relative w-full cursor-default rounded-lg bg-white">
				<ComboboxButton
					as="div"
					class="border-non relative z-10 flex items-center"
				>
					<ComboboxInput
						:id="props.id"
						class="flex w-full rounded-md p-3"
						:class="{
							'bg-gray-100': props.variant === 'default',
							'border border-gray-300': props.variant === 'outlined',
							'bg-transparent': props.variant === 'plain'
						}"
						:displayValue="(item: any) => item"
						autocomplete="one-time-code"
						:placeholder="props.placeholder"
						@change="query = $event.target.value"
					/>

					<div class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
						<UIIcon
							:icon="open ? ChevronUpIcon : ChevronDownIcon"
							size="md"
							class="pointer-events-none"
						/>
					</div>
				</ComboboxButton>
			</div>

			<TransitionRoot @after-leave="query = ''">
				<ComboboxOptions
					class="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-300 bg-white py-1"
				>
					<div
						v-if="filteredItems.length === 0 && query !== ''"
						class="text-danger relative cursor-default select-none px-4 py-2"
					>
						No results match "{{ query }}"
					</div>

					<div v-else>
						<ComboboxOption
							v-for="(item, index) in filteredItems"
							as="template"
							:key="index"
							:value="item"
							v-slot="{ selected, active }"
						>
							<UIComboboxItem
								:active="active"
								:selected="selected"
							>
								{{ item }}
							</UIComboboxItem>
						</ComboboxOption>
					</div>
				</ComboboxOptions>
			</TransitionRoot>
		</div>
	</Combobox>
</template>
