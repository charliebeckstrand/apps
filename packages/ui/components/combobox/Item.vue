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
		class="relative cursor-pointer select-none px-4 py-2"
		:class="{
			'bg-accent/75 text-white': props.active && !props.selected,
			'bg-accent text-white': props.selected
		}"
	>
		<span
			class="block truncate"
			:class="{ 'font-medium': props.selected, 'font-normal': !props.selected }"
		>
			<slot />
		</span>
	</li>
</template>
