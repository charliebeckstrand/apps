<script setup lang="ts"></script>

<template>
	<div
		class="ui-form-item relative flex items-center"
		:class="{
			prepend: $slots['prepend'],
			append: $slots['append']
		}"
	>
		<div class="absolute left-0 z-20 px-3 empty:px-0">
			<slot name="prepend" />
		</div>

		<div class="flex-grow">
			<slot />
		</div>

		<div class="absolute right-0 z-20 px-3 empty:px-0">
			<slot name="append" />
		</div>
	</div>
</template>

<style scoped lang="scss">
.ui-form-item {
	&.prepend:not(:empty) {
		:deep(input) {
			@apply pl-10;
		}
	}
	&.append:not(:empty) {
		:deep(input) {
			@apply pr-10;
		}
	}
}
</style>
