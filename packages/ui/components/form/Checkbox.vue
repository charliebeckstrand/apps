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

const { color, id, modelValue, size } = toRefs(props)

const inputValue = computed<boolean>({
	get: () => modelValue.value,
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
			:id="id"
			type="checkbox"
			v-model="inputValue"
			:class="[
				'cursor-pointer rounded focus:outline-offset-0',
				useTailwindClasses([useColor(color), useSize(size), useTextSize(size)])
			]"
			@keydown.enter="toggleInput"
		/>
		<label
			:for="id"
			class="cursor-pointer select-none"
		>
			<slot />
		</label>
	</div>
</template>

<style lang="scss" scoped></style>
