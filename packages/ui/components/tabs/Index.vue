<script setup lang="ts">
import { useJustify } from '@/composables/useJustify'
import { useTailwindClasses } from '@/composables/useTailwindClasses'

import type { Justify } from '@/types/base/justify'

interface Props {
	justify?: Justify
}

const props = withDefaults(defineProps<Props>(), {
	justify: 'center'
})

const { justify } = toRefs(props)
</script>

<template>
	<ul
		:class="[
			'flex flex-nowrap overflow-x-auto border-b border-gray-200 text-center font-medium text-gray-500',
			useTailwindClasses([[justify !== undefined, useJustify(justify)]])
		]"
	>
		<slot />
	</ul>
</template>
