<script setup lang="ts">
interface Props {
	active?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	active: false
})

const baseClasses = computed<string>(
	() =>
		`relative flex w-full cursor-pointer items-center justify-center border-b-2 py-3 font-medium ${
			props.active
				? 'border-primary text-primary'
				: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
		}`
)
</script>

<template>
	<li :class="[baseClasses]">
		<button class="flex items-center justify-between">
			<div>
				<slot name="prepend" />
			</div>

			<div class="mx-auto px-2">
				<slot />
			</div>

			<div>
				<slot name="append" />
			</div>
		</button>
	</li>
</template>
