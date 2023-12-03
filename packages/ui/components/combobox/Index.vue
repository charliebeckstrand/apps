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

interface Emit {
	(event: 'update:modelValue', ...args: any[]): void
}

interface Props {
	modelValue: null
	items: string[]
	placeholder?: string
}

const emit = defineEmits<Emit>()

// items will be an array of items with a value and label or an array of strings
const props = withDefaults(defineProps<Props>(), {
	modelValue: null,
	items: undefined,
	placeholder: 'Select an item'
})

const query = ref('')

const filteredItems = computed(() => {
	return props.items.filter((item) => {
		return item.toLowerCase().includes(query.value.toLowerCase())
	})
})

const value = computed({
	get: () => props.modelValue,
	set: (newValue) => {
		emit('update:modelValue', newValue)
	}
})
</script>

<template>
	<Combobox
		v-slot="{ open }"
		v-model="value"
	>
		<div class="relative">
			<div class="relative w-full cursor-default rounded-lg bg-white">
				<ComboboxButton
					as="div"
					class="border-non relative z-10 flex items-center"
				>
					<ComboboxInput
						class="flex w-full rounded-md bg-gray-100 p-3"
						:displayValue="(item: any) => item"
						:placeholder="props.placeholder"
						@change="query = $event.target.value"
					/>

					<div class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
						<UIButton
							icon
							variant="plain"
							color="primary"
							v-if="value"
							@click="value = null"
						>
							<UIIcon
								:icon="XMarkIcon"
								size="md"
							/>
						</UIButton>
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

<style scoped lang="scss"></style>
