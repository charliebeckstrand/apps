<script setup lang="ts">
interface Item {
	label: string
	to: string
	disabled?: boolean
}

const props = defineProps<{
	items: Item[]
}>()
</script>

<template>
	<nav
		aria-label="breadcrumb"
		class="ui-breadcrumbs"
	>
		<template
			v-for="(item, index) in props.items"
			:key="index"
		>
			<nuxt-link
				:to="item.to"
				class="breadcrumb-item"
				:class="{
					'text-gray-500 hover:text-gray-700': index !== props.items.length - 1
				}"
				aria-current="page"
				:disabled="item.disabled"
			>
				{{ item.label }}
			</nuxt-link>

			<template v-if="index !== props.items.length - 1">
				<span
					aria-hidden="true"
					class="px-2 text-gray-500"
				>
					/
				</span>
			</template>
		</template>
	</nav>
</template>
