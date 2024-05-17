<script setup lang="ts">
import { useTailwindClasses } from '@/composables/useTailwindClasses'
import { useVariant } from '@/composables/form/useVariant'

import type { Variant } from '@/types/form/item'

interface Props {
	variant?: Variant
}

const props = withDefaults(defineProps<Props>(), {
	variant: 'default'
})

const { variant } = toRefs(props)
</script>

<template>
	<div
		:class="[
			'relative flex items-center',
			{
				'has-prepend': $slots.prepend,
				'has-append': $slots.append
			}
		]"
	>
		<div
			class="absolute left-4 z-20 pr-2"
			:class="useTailwindClasses([useVariant(variant)])"
		>
			<slot name="prepend" />
		</div>

		<div class="flex-grow space-y-1">
			<slot />
		</div>

		<div
			class="absolute right-4 z-10 pl-2"
			:class="useTailwindClasses([useVariant(variant)])"
		>
			<slot name="append" />
		</div>
	</div>
</template>

<style scoped lang="scss">
.has-prepend:not(:empty) {
	:deep(input) {
		@apply pl-12;
	}
}
.has-append:not(:empty) {
	:deep(input) {
		@apply pr-12;
	}
}
</style>
