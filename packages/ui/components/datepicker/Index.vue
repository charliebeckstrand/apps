<script setup lang="ts">
import { ref, computed } from 'vue'

import { CalendarIcon, XMarkIcon } from '@heroicons/vue/24/outline'

import VueDatePicker from '@vuepic/vue-datepicker'

import '@vuepic/vue-datepicker/dist/main.css'

type Variant = 'default' | 'outlined' | 'plain'

type Emit = {
	(event: 'update:modelValue', value: string): void
}

interface Props {
	id: string
	modelValue?: string
	min?: string
	max?: string
	variant?: Variant
	disabled?: boolean
}

const emit = defineEmits<Emit>()

const props = withDefaults(defineProps<Props>(), {
	id: '',
	modelValue: '',
	min: '',
	max: '',
	variant: 'default',
	disabled: false
})

const datepickerRef = ref()

const inputValue = computed({
	get: () => props.modelValue,
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
			:min-date="props.min"
			:max-date="props.max"
			:enable-time-picker="false"
			:month-change-on-scroll="false"
			class="eui-datepicker"
			:auto-position="true"
			keep-action-row
			:action-row="{ showNow: true, showCancel: true }"
		>
			<template #dp-input="{ value, isMenuOpen, onEnter }">
				<UIFormItem>
					<template #prepend>
						<UIIcon :icon="CalendarIcon" />
					</template>
					<UIFormInput
						:id="props.id"
						:value="value"
						:variant="props.variant"
						placeholder="Select Date"
						:class="{ active: isMenuOpen }"
						@keydown.enter="onEnter"
					/>
				</UIFormItem>
			</template>
			<template #clear-icon="{ clear }">
				<div class="p-3">
					<UIIcon
						:icon="XMarkIcon"
						class="hover:text-black"
						@click="clear"
					/>
				</div>
			</template>
			<template #action-buttons>
				<div class="action-row grid w-full grid-cols-2 gap-1">
					<UIButton
						color="primary"
						block
						@click="setDateToToday"
					>
						Today
					</UIButton>
					<UIButton
						color="primary"
						variant="outlined"
						block
						@click="clearDate"
					>
						{{ datepickerRef.internalModelValue ? 'Clear' : 'Cancel' }}
					</UIButton>
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