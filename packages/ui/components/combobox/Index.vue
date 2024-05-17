<script setup lang="ts">
import Button from '@/components/button/Index.vue'
import ComboboxItem from '@/components/combobox/Item.vue'
import Icon from '@/components/icon/Index.vue'

import { computed, ref, toRefs } from 'vue'
import { ChevronDownIcon, ChevronUpIcon, XMarkIcon } from '@heroicons/vue/24/solid'
import {
	Combobox,
	ComboboxInput,
	ComboboxButton,
	ComboboxOptions,
	ComboboxOption,
	TransitionRoot
} from '@headlessui/vue'

import { usePadding } from '@/composables/usePadding'
import { useTailwindClasses } from '@/composables/useTailwindClasses'
import { useTextSize } from '@/composables/useTextSize'
import { useVariant } from '@/composables/form/useVariant'

type Item = {
	value: string
	label: string
}
type ModelValue = Item | undefined
type Size = 'sm' | 'md' | 'lg'
type Variant = 'default' | 'outlined' | 'plain'

type Emit = {
	(event: 'update:modelValue', value: ModelValue): void
}

interface Props {
	clearable?: boolean
	id: string
	items: Item[]
	modelValue: ModelValue | undefined
	multiple?: boolean
	placeholder?: string
	size?: Size
	variant?: Variant
}

const emit = defineEmits<Emit>()

const props = withDefaults(defineProps<Props>(), {
	clearable: false,
	id: undefined,
	items: undefined,
	modelValue: undefined,
	multiple: false,
	placeholder: 'Select an item',
	size: 'md',
	variant: 'default'
})

const { clearable, id, items, modelValue, placeholder, size, variant } = toRefs(props)

const query = ref('')

const inputValue = computed({
	get: () => modelValue.value,
	set: (newValue: ModelValue) => {
		emit('update:modelValue', newValue ? newValue : undefined)
	}
})

const filteredItems = computed(() =>
	items.value.filter((item: Item) => {
		const match =
			item.label.toLowerCase().includes(query.value.toLowerCase()) ||
			item.value.toLowerCase().includes(query.value.toLowerCase())

		return match
	})
)

const clear = () => {
	inputValue.value = {} as Item
	query.value = ''
}
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
					class="relative z-10 flex items-center border-none"
				>
					<ComboboxInput
						:id="id"
						:class="[
							'flex w-full rounded-md',
							useTailwindClasses([usePadding(size), useTextSize(size), useVariant(variant)])
						]"
						:displayValue="(item: any) => item.label"
						autocomplete="one-time-code"
						:placeholder="placeholder"
						@change="query = $event.target.value"
					/>

					<div class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
						<Button
							v-if="clearable && inputValue?.value"
							icon
							size="sm"
							@click.stop="clear"
						>
							<Icon :icon="XMarkIcon" />
						</Button>

						<Icon
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
							as="template"
							v-for="(item, index) in filteredItems"
							:key="index"
							:value="item"
							v-slot="{ selected, active }"
						>
							<ComboboxItem
								:active="active"
								:selected="selected"
							>
								<slot
									name="item"
									:item="item"
								>
									<!-- Fallback content if no slot is provided -->
									{{ item.label }}
								</slot>
							</ComboboxItem>
						</ComboboxOption>
					</div>
				</ComboboxOptions>
			</TransitionRoot>
		</div>
	</Combobox>
</template>
