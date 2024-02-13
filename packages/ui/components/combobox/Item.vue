<script setup lang="ts">
interface Props {
	active: boolean
	selected: boolean
}

const props = withDefaults(defineProps<Props>(), {
	active: false,
	selected: false
})

const classes = computed(() => {
	const classes = ['relative cursor-pointer select-none px-4 py-2']

	if (props.active && !props.selected) {
		classes.push('bg-accent/75 text-white')
	} else if (props.selected) {
		classes.push('bg-accent text-white')
	}

	return classes.join(' ')
})
</script>

<template>
	<li :class="classes">
		<span
			class="block truncate"
			:class="{ 'font-medium': props.selected, 'font-normal': !props.selected }"
		>
			<slot />
		</span>
	</li>
</template>
