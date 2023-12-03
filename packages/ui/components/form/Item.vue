<script setup lang="ts">
interface Props {
	type?: string
}

const props = withDefaults(defineProps<Props>(), {
	type: 'text'
})
</script>

<template>
	<div
		class="ui-form-item relative flex items-center"
		:class="{ text: props.type === 'text', number: props.type === 'number' }"
	>
		<div class="prepend absolute left-0 z-20 bg-gray-100 px-2">
			<slot name="prepend" />
		</div>

		<div class="flex-grow">
			<slot />
		</div>

		<div class="append absolute right-0 z-20 bg-gray-100 px-2">
			<slot name="append" />
		</div>
	</div>
</template>

<style scoped lang="scss">
.ui-form-item.number {
	&:hover,
	&:focus,
	&:focus-within,
	&:active {
		.append {
			@apply pointer-events-none mr-8;
		}
	}
}
</style>
