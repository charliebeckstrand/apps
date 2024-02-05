<script setup lang="ts">
import { computed } from 'vue'

import { languages } from '@/common/languages'

type Emit = {
	(event: 'update:modelValue', value: Item): void
}

type Item = {
	value: string
	label: string
}

interface Props {
	id: string
	modelValue: Item
}

const emit = defineEmits<Emit>()

const props = withDefaults(defineProps<Props>(), {
	id: undefined,
	modelValue: undefined
})

const inputValue = computed({
	get: () => props.modelValue,
	set: (newValue: Item) => {
		emit('update:modelValue', newValue)
	}
})
</script>

<template>
	<UIFormItem>
		<template #prepend>
			<FlagImg :src="inputValue?.value" />
		</template>
		<UICombobox
			:id="props.id"
			v-model="inputValue"
			:items="languages"
		>
			<template #English="{ item }">
				<div class="flex items-center space-x-3">
					<FlagImg :src="item.value" />
					<div>
						{{ item.label }}
					</div>
				</div>
			</template>
			<template #Spanish="{ item }">
				<div class="flex items-center space-x-3">
					<FlagImg :src="item.value" />
					<div>
						{{ item.label }}
					</div>
				</div>
			</template>
		</UICombobox>
	</UIFormItem>
</template>
