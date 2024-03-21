<script setup lang="ts">
import { computed } from 'vue'

import { useColor } from '@/composables/form/checkbox/useColor'
import { useSize } from '@/composables/form/checkbox/useSize'
import { useTailwindClasses } from '@/composables/useTailwindClasses'
import { useTextSize } from '@/composables/useTextSize'

import type { Color, Size } from '@/types/form/checkbox'

type Emit = {
	(event: 'update:modelValue', value: boolean): void
}

interface Props {
	color?: Color
	id: string
	modelValue: boolean
	size?: Size
}

const emit = defineEmits<Emit>()

const props = withDefaults(defineProps<Props>(), {
	color: 'primary',
	id: undefined,
	modelValue: undefined,
	size: 'md'
})

const inputValue = computed<boolean>({
	get: () => props.modelValue,
	set: (value: boolean) => {
		emit('update:modelValue', value)
	}
})

const toggleInput = () => {
	emit('update:modelValue', !inputValue.value)
}
</script>

<template>
	<div class="flex items-center space-x-2">
		<input
			:id="props.id"
			type="checkbox"
			v-model="inputValue"
			:class="[
				useTailwindClasses([useColor(props.color), useSize(props.size), useTextSize(props.size)]),
				'cursor-pointer rounded focus:outline-offset-0'
			]"
			@keydown.enter="toggleInput"
		/>
		<label
			:for="props.id"
			class="cursor-pointer select-none"
		>
			<slot />
		</label>
	</div>
</template>

<style lang="scss" scoped></style>
