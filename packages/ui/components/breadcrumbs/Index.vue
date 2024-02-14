<script setup lang="ts">
type Item = {
	label: string
	to?: string
	disabled?: boolean
}

interface Props {
	items: Item[]
}

const props = withDefaults(defineProps<Props>(), {
	items: undefined
})
</script>

<template>
	<nav aria-label="breadcrumb">
		<template
			v-for="(item, index) in props.items"
			:key="index"
		>
			<nuxt-link
				:to="item.to"
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
