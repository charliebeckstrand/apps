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

const logout = () => {
	authStore.setUser(null)

	navigateTo('/')
}

onMounted(() => {
	items.value = [
		{
			value: 'Logout',
			icon: PowerIcon,
			onClick: () => {
				logout()
			}
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
						src="/bowl.png"
						alt="Logo"
						class="h-10 w-10"
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
							variant="text"
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
					variant="text"
					dark
					@click="setUser"
				>
					Login
				</Button>
			</template>
		</UINavbar>

		<slot />
	</div>
</template>
