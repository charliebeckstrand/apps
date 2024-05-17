<script setup lang="ts">
import { ref, computed } from 'vue'
import { CalendarIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import VueDatePicker from '@vuepic/vue-datepicker'

import '@vuepic/vue-datepicker/dist/main.css'

import Button from '@/components/button/Index.vue'
import FormItem from '@/components/form/Item.vue'
import FormInput from '@/components/form/Input.vue'
import Icon from '@/components/icon/Index.vue'

import type { Variant } from '@/types/form/input'

type Emit = {
	(event: 'update:modelValue', value: string): void
}

interface Props {
	disabled?: boolean
	id: string
	max?: string
	min?: string
	modelValue?: string
	variant?: Variant
}

const emit = defineEmits<Emit>()

const props = withDefaults(defineProps<Props>(), {
	disabled: false,
	id: '',
	max: '',
	min: '',
	modelValue: '',
	variant: 'default'
})

const { id, max, min, modelValue, variant } = toRefs(props)

const datepickerRef = ref()

const inputValue = computed({
	get: () => modelValue.value,
	set: (value) => emit('update:modelValue', value)
})

const setDateToToday = () => {
	const today = new Date()
	const month = today.getMonth() + 1
	const day = today.getDate()
	const year = today.getFullYear()
	const formattedDate = `${month}/${day}/${year}`

	emit('update:modelValue', formattedDate)

	datepickerRef.value.closePicker()
}

const clearDate = () => {
	emit('update:modelValue', '')

	datepickerRef.value.closePicker()
}
</script>

<template>
	<div>
		<VueDatePicker
			ref="datepickerRef"
			v-model="inputValue"
			model-type="MM/dd/yyyy"
			placeholder="Select Date"
			auto-apply
			:min-date="min"
			:max-date="max"
			:enable-time-picker="false"
			:month-change-on-scroll="false"
			class="eui-datepicker"
			:auto-position="true"
			keep-action-row
			:action-row="{ showNow: true, showCancel: true }"
		>
			<template #dp-input="{ value, isMenuOpen, onEnter }">
				<template v-if="$slots.trigger">
					<slot name="trigger" />
				</template>
				<template v-else>
					<FormItem>
						<template #prepend>
							<Icon :icon="CalendarIcon" />
						</template>
						<FormInput
							:id="id"
							:value="value"
							:variant="variant"
							placeholder="Select Date"
							:class="{ active: isMenuOpen }"
							@keydown.enter="onEnter"
						/>
					</FormItem>
				</template>
			</template>
			<template #clear-icon="{ clear }">
				<div class="p-3">
					<Icon
						:icon="XMarkIcon"
						class="hover:text-black"
						@click="clear"
					/>
				</div>
			</template>
			<template #action-buttons>
				<div class="action-row grid w-full grid-cols-2 gap-1">
					<Button
						color="primary"
						block
						@click="setDateToToday"
					>
						Today
					</Button>
					<Button
						color="primary"
						variant="outlined"
						block
						@click="clearDate"
					>
						{{ datepickerRef.internalModelValue ? 'Clear' : 'Cancel' }}
					</Button>
				</div>
			</template>
		</VueDatePicker>
	</div>
</template>

<style lang="scss" scoped>
.eui-datepicker {
	:deep(.dp__calendar) {
		.dp__today {
			@apply border-secondary;
		}
		.dp__active_date {
			@apply bg-primary text-white;
		}
	}
	:deep(*.active) {
		outline: -webkit-focus-ring-color auto 1px;
	}
}
</style>
