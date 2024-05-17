<script setup lang="ts">
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

const { modelValue, steps } = toRefs(props)
</script>

<template>
	<nav aria-label="stepper">
		<ol class="flex items-center justify-between">
			<template
				v-for="(step, index) in steps"
				:key="index"
			>
				<li
					class="whitespace-nowrap"
					:class="[
						{ 'bg-primary text-white': step.step === modelValue },
						'cursor-pointer select-none rounded-full p-4'
					]"
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
