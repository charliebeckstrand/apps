<script setup lang="ts">
import { computed, toRefs } from 'vue'

import { Switch } from '@headlessui/vue'

import { useColor } from '@/composables/useColor'
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

const { color, modelValue } = toRefs(props)

const emit = defineEmits<Emit>()

const value = computed({
	get: () => modelValue.value,
	set: (value) => emit('update:modelValue', value)
})
</script>

<template>
	<Switch
		v-model="value"
		:class="[
			'focus:outline-blue relative flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-offset-4',
			value ? useTailwindClasses([useColor(color)]) : 'bg-gray-200'
		]"
		@keydown.enter.stop
	>
		<span
			aria-hidden="true"
			:class="[
				'pointer-events-none block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
				value ? 'translate-x-5' : 'translate-x-0'
			]"
		/>
	</Switch>
</template>
