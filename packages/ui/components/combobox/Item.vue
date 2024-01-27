<script setup lang="ts">
interface Props {
	active: boolean
	selected: boolean
}

const props = withDefaults(defineProps<Props>(), {
	active: false,
	selected: false
})
</script>

<template>
	<li
		class="relative cursor-pointer select-none py-2 pl-10 pr-4"
		:class="{
			'bg-secondary/75 text-white': active && !selected,
			'bg-secondary text-white': selected
		}"
	>
		<span
			class="block truncate"
			:class="{ 'font-medium': selected, 'font-normal': !selected }"
		>
			<slot />
		</span>
	</li>
</template>
