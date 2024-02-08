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
		class="ui-form-item relative flex items-center"
		:class="{
			'has-prepend': $slots['prepend'],
			'has-append': $slots['append']
		}"
	>
		<div
			class="absolute left-3 z-20 pr-1.5"
			:class="[variantClasses]"
		>
			<slot name="prepend" />
		</div>

		<div class="flex-grow">
			<slot />
		</div>

		<div
			class="absolute right-3 z-20 pl-1.5"
			:class="[variantClasses]"
		>
			<slot name="append" />
		</div>
	</div>
</template>

<style scoped lang="scss">
.ui-form-item {
	&.has-prepend:not(:empty) {
		:deep(input) {
			@apply pl-10;
		}
	}
	&.has-append:not(:empty) {
		:deep(input) {
			@apply pr-10;
		}
	}
}
</style>
