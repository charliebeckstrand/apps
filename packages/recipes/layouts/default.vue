<script setup lang="ts">
import { ref } from 'vue'

import { ChevronDownIcon, UserCircleIcon, PowerIcon } from '@heroicons/vue/24/solid'

type Item = {
	value: string
	icon: any
}

const items = ref<Item[]>([])

items.value = [
	{
		value: 'Sign Out',
		icon: PowerIcon
	}
]
</script>

<template>
	<UINavbar color="secondary">
		<template #left>
			<nuxt-link to="/">
				<img
					src="/restaurant.png"
					alt="Logo"
					class="h-8 w-8"
				/>
			</nuxt-link>
		</template>
		<template #right>
			<UIMenu :items="items">
				<template #trigger>
					<UIButton
						icon
						color="accent"
						variant="tonal"
						dark
					>
						<UIIcon
							:icon="UserCircleIcon"
							size="md"
						/>
						<template #append>
							<UIIcon
								:icon="ChevronDownIcon"
								size="sm"
							/>
						</template>
					</UIButton>
				</template>
			</UIMenu>
		</template>
	</UINavbar>

	<NuxtPage />
</template>
