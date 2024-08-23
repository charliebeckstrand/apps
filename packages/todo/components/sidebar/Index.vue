<script setup lang="ts">
import { ViewColumnsIcon, RectangleStackIcon } from '@heroicons/vue/24/outline'

const items = [
	{ to: '/lanes', label: 'Lanes', icon: ViewColumnsIcon },
	{ to: '/backlog', label: 'Backlog', icon: RectangleStackIcon }
]
</script>

<template>
	<UISidebar width="4.5rem">
		<template #prepend>
			<nuxt-link
				to="/"
				class="my-3 flex h-10 w-10 rounded-full transition-transform duration-100 ease-in-out hover:scale-110"
			>
				<img
					src="/sticky-note.png"
					alt="Logo"
					class="m-auto h-[2rem] w-[2.25rem] min-w-[2.25rem]"
				/>
			</nuxt-link>
		</template>
		<template #default>
			<div class="items flex flex-col space-y-2">
				<UIButton
					v-for="(item, index) in items"
					:key="index"
					v-tippy="{ content: item.label, placement: 'right', delay: [0, 0], arrow: false }"
					:to="item.to"
					color="white"
					variant="text"
					class="hover:scale-110"
					icon
					dark
				>
					<UIIcon :icon="item.icon" />
				</UIButton>
			</div>
		</template>
		<template #append></template>
	</UISidebar>
</template>

<style scoped lang="scss">
.items {
	.router-link-exact-active {
		@apply bg-accent/50;
	}
}
</style>
