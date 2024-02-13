<script setup lang="ts">
import { computed } from 'vue'

interface Step {
	label: string
	step: number
}

interface Props {
	modelValue: number
	steps: Step[]
}

type Emit = {
	(event: 'update:modelValue', value: string | number): void
}

const emit = defineEmits<Emit>()

const props = withDefaults(defineProps<Props>(), {
	modelValue: 1,
	steps: () => []
})

const classes = computed<string>(() => {
	const classes = ['flex items-center justify-between']

	return classes.join(' ')
})

const itemClasses = computed<string>(() => {
	const classes = ['cursor-pointer select-none rounded-full p-4']

	return classes.join(' ')
})
</script>

<template>
	<nav aria-label="stepper">
		<ol :class="classes">
			<template
				v-for="(step, index) in props.steps"
				:key="index"
			>
				<li
					class="whitespace-nowrap"
					:class="[itemClasses, { 'bg-primary text-white': step.step === props.modelValue }]"
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
