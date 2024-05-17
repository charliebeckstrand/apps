<script setup lang="ts">
interface Props {
	active: boolean
	selected: boolean
}

const props = withDefaults(defineProps<Props>(), {
	active: false,
	selected: false
})

const { active, selected } = toRefs(props)
</script>

<template>
	<li
		:class="[
			'relative cursor-pointer select-none px-4 py-2',
			{ 'bg-accent/75 text-white': active && !selected, 'bg-accent text-white': selected }
		]"
	>
		<span
			class="block truncate"
			:class="{ 'font-medium': selected, 'font-normal': !selected }"
		>
			<slot />
		</span>
	</li>
</template>
