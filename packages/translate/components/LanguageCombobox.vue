<script setup lang="ts">
import { computed } from 'vue'

import { languages } from '@/common/languages'

import type { Language } from '@/types/language'

type Emit = {
	(event: 'update:modelValue', iso: Language): void
}

interface Props {
	id: string
	modelValue: Language
}

const emit = defineEmits<Emit>()

const props = withDefaults(defineProps<Props>(), {
	id: undefined,
	modelValue: undefined
})

const inputValue = computed({
	get: () => {
		const language = languages.find((language) => language.iso === props.modelValue.iso)

		return language ?? ({} as Language)
	},
	set: (iso: Language) => {
		emit('update:modelValue', iso)
	}
})

const sortedLanguages = computed(() => {
	return languages.sort((a, b) => a.label.localeCompare(b.label))
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
			:items="sortedLanguages"
		>
			<template #item="{ item }">
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
