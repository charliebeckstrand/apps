<script setup lang="ts">
import { ref } from 'vue'

import { ChevronDownIcon, PowerIcon } from '@heroicons/vue/24/solid'

import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

type Item = {
	value: string
	icon: any
	onClick?: () => void
}

const items = ref<Item[]>([])

const setUser = () => {
	if (authStore.user?.id) return

	authStore.setUser({
		id: 1,
		name: 'John Doe'
	})
}
onMounted(() => {
	items.value = [
		{
			value: 'Logout',
			icon: PowerIcon,
			onClick: () => authStore.setUser(null)
		}
	]
})
</script>

<template>
	<div>
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
				<UIMenu
					v-if="authStore.user?.id"
					:items="items"
				>
					<template #trigger>
						<Button
							color="accent"
							text-color="white"
							variant="tonal"
							rounded="full"
							dark
						>
							{{ authStore.user?.name }}
							<template #append>
								<UIIcon
									:icon="ChevronDownIcon"
									size="sm"
								/>
							</template>
						</Button>
					</template>
				</UIMenu>
				<Button
					v-else
					color="accent"
					text-color="white"
					variant="tonal"
					rounded="full"
					dark
					@click="setUser"
				>
					Login
				</Button>
			</template>
		</UINavbar>

		<NuxtPage />
	</div>
</template>
