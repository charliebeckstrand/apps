<script setup lang="ts">
import { languages } from '@/common/languages'

interface Props {
	src: string
}

const props = withDefaults(defineProps<Props>(), {
	src: undefined
})

const getLanguage = () => {
	const language = languages.find((language) => language.value === props.src)

	return language?.value || ''
}
</script>

<template>
	<img
		:src="`/flags/${getLanguage()}.png`"
		:alt="props.src"
		class="h-5 w-5"
	/>
</template>
