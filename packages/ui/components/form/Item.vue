<script setup lang="ts">
import type { Variant } from '@/types/form/item'

interface Props {
	variant?: Variant
}

const props = withDefaults(defineProps<Props>(), {
	variant: 'default'
})

const variantClasses = computed<string>(() => {
	const variantMap: Record<Variant, string> = {
		default: 'bg-gray-100',
		outlined: 'bg-white',
		tonal: 'bg-gray-50',
		plain: 'bg-white'
	}

	return variantMap[props.variant]
})
</script>

<template>
	<div
		class="relative flex items-center"
		:class="{
			'has-prepend': $slots['prepend'],
			'has-append': $slots['append']
		}"
	>
		<div
			class="absolute left-4 z-20 pr-2"
			:class="variantClasses"
		>
			<slot name="prepend" />
		</div>

		<div class="flex-grow">
			<slot />
		</div>

		<div
			class="absolute right-4 z-10 pl-2"
			:class="variantClasses"
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
