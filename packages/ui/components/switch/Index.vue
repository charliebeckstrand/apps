<script setup lang="ts">
import { computed } from 'vue'

import { Switch } from '@headlessui/vue'

import { useColor } from '@/composables/useColor'
import { useSize } from '@/composables/useSize'
import { useTailwindClasses } from '@/composables/useTailwindClasses'

import type { Color, Size } from '@/types/switch'

type Emit = (event: 'update:modelValue', value: boolean) => void

interface Props {
	color?: Color
	modelValue: boolean
	size?: Size
}

const props = withDefaults(defineProps<Props>(), {
	color: 'primary',
	modelValue: false,
	size: 'md'
})

const emit = defineEmits<Emit>()

const value = computed({
	get: () => props.modelValue,
	set: (value) => emit('update:modelValue', value)
})
</script>

<template>
	<Switch
		v-model="value"
		:class="[
			value ? useTailwindClasses([useColor(props.color)]) : 'bg-gray-200',
			'focus:outline-blue relative flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-offset-4'
		]"
		@keydown.enter.stop
	>
		<span
			aria-hidden="true"
			:class="[
				value ? 'translate-x-5' : 'translate-x-0',
				'pointer-events-none block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
			]"
		/>
	</Switch>
</template>
