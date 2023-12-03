<script setup lang="ts">
import { computed } from 'vue'

interface Step {
	label: string
	step: number
}

const props = defineProps<{
	steps: Step[]
	modelValue: number
}>()

const baseClasses = computed<string>(() => {
	const classes = 'flex items-center justify-between'

	return classes
})

const baseItemClasses = computed<string>(() => {
	const classes = 'cursor-pointer select-none rounded-full p-3'

	return classes
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
	<nav aria-label="stepper">
		<ol :class="[baseClasses]">
			<template
				v-for="(step, index) in props.steps"
				:key="index"
			>
				<li
					class="whitespace-nowrap"
					:class="[baseItemClasses, { 'bg-primary text-white': step.step === props.modelValue }]"
					@click="emit('update:modelValue', step.step)"
				>
					{{ step.label }}
				</li>
				<div
					v-if="index !== steps.length - 1"
					class="mx-4 h-1 w-full border-b border-gray-300"
				></div>
			</template>
		</ol>
	</nav>
</template>

<style scoped lang="scss"></style>
