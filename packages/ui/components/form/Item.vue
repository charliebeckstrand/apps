<script setup lang="ts"></script>

<template>
	<div
		class="ui-form-item relative flex items-center"
		:class="{
			prepend: $slots.prepend,
			append: $slots.append
		}"
	>
		<div class="prepend absolute left-0 z-20 px-2">
			<slot name="prepend" />
		</div>

		<div class="flex-grow">
			<slot />
		</div>

		<div class="append absolute right-0 z-20 px-2">
			<slot name="append" />
		</div>
	</div>
</template>

<style scoped lang="scss">
.ui-form-item {
	&.prepend {
		:deep(input) {
			@apply pl-10;
		}
	}
	&.append {
		:deep(input) {
			@apply pr-4;
		}
	}
}
</style>
