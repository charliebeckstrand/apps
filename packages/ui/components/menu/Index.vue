<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

interface Item {
	value: string
	icon: any
}

interface Props {
	items: Item[]
}

const props = defineProps<Props>()
</script>

<template>
	<Menu
		as="div"
		class="relative"
	>
		<MenuButton as="div">
			<slot name="trigger" />
		</MenuButton>

		<transition
			enter-active-class="transition duration-100 ease-out"
			enter-from-class="transform scale-95 opacity-0"
			enter-to-class="transform scale-100 opacity-100"
			leave-active-class="transition duration-75 ease-in"
			leave-from-class="transform scale-100 opacity-100"
			leave-to-class="transform scale-95 opacity-0"
		>
			<MenuItems
				class="focus:outline-primary absolute right-0 z-30 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg"
			>
				<div class="px-1 py-2">
					<MenuItem
						v-slot="{ active }"
						v-for="(item, index) in props.items"
						:key="index"
					>
						<UIButton
							color="primary"
							:variant="active ? 'tonal' : 'plain'"
							block
						>
							<template #prepend>
								<UIIcon
									:icon="item.icon"
									class="mr-2"
								/>
							</template>
							{{ item.value }}
						</UIButton>
					</MenuItem>
				</div>
			</MenuItems>
		</transition>
	</Menu>
</template>
