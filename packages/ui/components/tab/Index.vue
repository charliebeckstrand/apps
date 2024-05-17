<script setup lang="ts">
interface Props {
	active?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	active: false
})

const { active } = toRefs(props)
</script>

<template>
	<li
		:class="[
			'relative flex w-full cursor-pointer items-center justify-center border-b-2 py-2 font-medium',
			{
				'bg-accent/75 text-white': active,
				'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700': !active
			}
		]"
	>
		<button class="flex items-center justify-between space-x-2">
			<div v-if="$slots.prepend">
				<slot name="prepend" />
			</div>

			<div class="mx-auto px-2">
				<slot />
			</div>

			<div v-if="$slots.append">
				<slot name="append" />
			</div>
		</button>
	</li>
</template>
