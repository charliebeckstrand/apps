<script setup lang="ts"></script>

<template>
	<div class="flex overflow-x-scroll whitespace-nowrap">
		<slot />
	</div>
</template>

<style scoped lang="scss">
:deep(button) {
	border-radius: 0;
	&:first-child {
		@apply rounded-bl-md rounded-tl-md;
	}
	&:last-child {
		@apply rounded-br-md rounded-tr-md;
	}
}
</style>
