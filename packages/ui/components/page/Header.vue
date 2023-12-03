<script setup lang="ts">
interface Props {
	sticky?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	sticky: false
})
</script>

<template>
	<div
		class="ui-page-header flex items-center bg-white p-5"
		:class="{ 'sticky top-0': props.sticky }"
	>
		<div
			v-if="$slots['prepend']"
			class="prepend mr-5 flex items-center empty:mr-0"
		>
			<slot name="prepend" />
		</div>

		<div class="flex-grow space-y-4">
			<div class="space-y-2">
				<h2 class="line-clamp-1 items-center text-2xl font-black leading-tight">
					<slot name="title" />
				</h2>
				<h3
					v-if="$slots['subtitle']"
					class="leading-tight text-gray-500"
				>
					<slot name="subtitle" />
				</h3>
			</div>
			<div
				v-if="$slots['misc']"
				class="misc flex items-center"
			>
				<slot name="misc" />
			</div>
		</div>

		<div
			v-if="$slots['append']"
			class="append ml-5 flex items-center empty:ml-0"
		>
			<slot name="append" />
		</div>
	</div>
</template>

<style scoped lang="scss"></style>
