<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		lines?: number
	}>(),
	{
		lines: 3
	}
)
</script>

<template>
	<div
		role="status"
		class="max-w-lg animate-pulse space-y-2.5"
	>
		<div class="flex w-full items-center space-x-2">
			<div class="h-2.5 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
			<div class="h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
			<div class="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
		</div>
		<div class="flex w-full max-w-[480px] items-center space-x-2">
			<div class="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
			<div class="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
			<div class="h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
		</div>
		<div
			v-if="props.lines >= 3"
			class="flex w-full max-w-[400px] items-center space-x-2"
		>
			<div class="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
			<div class="h-2.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700"></div>
			<div class="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
		</div>
		<div
			v-if="props.lines >= 4"
			class="flex w-full max-w-[480px] items-center space-x-2"
		>
			<div class="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
			<div class="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
			<div class="h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
		</div>
		<div
			v-if="props.lines >= 5"
			class="flex w-full max-w-[440px] items-center space-x-2"
		>
			<div class="h-2.5 w-32 rounded-full bg-gray-300 dark:bg-gray-600"></div>
			<div class="h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
			<div class="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
		</div>
		<div
			v-if="props.lines >= 6"
			class="flex w-full max-w-[360px] items-center space-x-2"
		>
			<div class="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
			<div class="h-2.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700"></div>
			<div class="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
		</div>
		<span class="sr-only">Loading...</span>
	</div>
</template>
