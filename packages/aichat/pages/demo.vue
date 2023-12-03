<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Item {
	label: string
	to: string
}

const breadcrumbItems = ref<Item[]>([
	{
		label: 'Breadcrumb Item',
		to: '/test'
	},
	{
		label: 'Breadcrumb Item 2',
		to: '/test2'
	}
])

const progress1 = ref(0)
const progress2 = ref(0)
const progress3 = ref(0)

onMounted(() => {
	setInterval(() => {
		progress1.value = 25
		progress2.value = 50
		progress3.value = 75
	}, 1000)
})

const step = ref(1)

const steps = [
	{
		step: 1,
		label: 'Step 1'
	},
	{
		step: 2,
		label: 'Step 2'
	},
	{
		step: 3,
		label: 'Step 3'
	}
]

const form = ref({
	name: '',
	description: '',
	age: 18
})

const ages = ref([
	{
		label: '18',
		value: 18
	},
	{
		label: '19',
		value: 19
	},
	{
		label: '20',
		value: 20
	}
])

definePageMeta({
	layout: 'blank'
})
</script>

<template>
	<div class="min-h-full">
		<UINavbar>
			<template #left> Navbar </template>
			<template #right> </template>
		</UINavbar>

		<UINavbar color="secondary">
			<template #left> Navbar </template>
			<template #right> </template>
		</UINavbar>

		<div class="space-y-5 p-5">
			<UIPageHeader>
				<template #title>Title</template>
				<template #subtitle>Subtitle</template>
			</UIPageHeader>

			<UIFlex>
				<UIButton color="primary"> Primary </UIButton>
				<UIButton
					color="primary"
					variant="outlined"
				>
					Primary
				</UIButton>
				<UIButton
					color="primary"
					variant="tonal"
				>
					Primary
				</UIButton>
				<UIButton
					color="primary"
					variant="text"
				>
					Primary
				</UIButton>
				<UIButton
					color="primary"
					variant="plain"
				>
					Primary
				</UIButton>
			</UIFlex>

			<UIFlex>
				<UIButton color="secondary"> Secondary </UIButton>
				<UIButton
					color="secondary"
					variant="outlined"
				>
					Secondary
				</UIButton>
				<UIButton
					color="secondary"
					variant="tonal"
				>
					Secondary
				</UIButton>
				<UIButton
					color="secondary"
					variant="text"
				>
					Secondary
				</UIButton>
				<UIButton
					color="secondary"
					variant="plain"
				>
					Secondary
				</UIButton>
			</UIFlex>

			<UIFlex>
				<UIButton color="accent"> Accent </UIButton>
				<UIButton
					color="accent"
					variant="outlined"
				>
					Accent
				</UIButton>
				<UIButton
					color="accent"
					variant="tonal"
				>
					Accent
				</UIButton>
				<UIButton
					color="accent"
					variant="text"
				>
					Accent
				</UIButton>
				<UIButton
					color="accent"
					variant="plain"
				>
					Accent
				</UIButton>
			</UIFlex>

			<UIFlex>
				<UIButtonGroup>
					<UIButton color="primary"> Primary </UIButton>
					<UIButton color="primary"> Primary </UIButton>
					<UIButton color="primary"> Primary </UIButton>
				</UIButtonGroup>
				<UIButtonGroup>
					<UIButton color="secondary"> Secondary </UIButton>
					<UIButton color="secondary"> Secondary </UIButton>
					<UIButton color="secondary"> Secondary </UIButton>
				</UIButtonGroup>

				<UIButtonGroup>
					<UIButton color="primary"> Primary </UIButton>
					<UIButton color="secondary"> Secondary </UIButton>
					<UIButton color="accent"> Accent </UIButton>
				</UIButtonGroup>
			</UIFlex>

			<UIFlex grow>
				<UIList>
					<UIListItem>Item</UIListItem>
					<UIListItem>Item 2</UIListItem>
					<UIListItem>Item 3</UIListItem>
				</UIList>

				<UIList
					color="primary"
					variant="outlined"
				>
					<UIListItem>Item</UIListItem>
					<UIListItem>Item 2</UIListItem>
					<UIListItem>Item 3</UIListItem>
				</UIList>

				<UIList color="accent">
					<UIListItem>Item</UIListItem>
					<UIListItem>Item 2</UIListItem>
					<UIListItem>Item 3</UIListItem>
				</UIList>

				<UIList
					color="accent"
					variant="outlined"
				>
					<UIListItem>Item</UIListItem>
					<UIListItem>Item 2</UIListItem>
					<UIListItem>Item 3</UIListItem>
				</UIList>
			</UIFlex>

			<UIFlex>
				<UICard
					color="secondary"
					variant="outlined"
				>
					<template #title>Title</template>
					<template #subtitle>Subtitle</template>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
					et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum.
					<template #append>
						<UIButton
							color="secondary"
							variant="plain"
							>Button</UIButton
						>
					</template>
				</UICard>

				<UICard variant="outlined">
					<template #subtitle>Subtitle</template>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
					et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum.
				</UICard>

				<UICard
					color="accent"
					variant="tonal"
				>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
					et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum.
				</UICard>
			</UIFlex>

			<UIFlex grow>
				<UIAlert color="accent"> Accent </UIAlert>

				<UIAlert
					color="accent"
					variant="tonal"
				>
					Accent
				</UIAlert>
			</UIFlex>

			<UIFlex>
				<UIBadge
					color="primary"
					size="lg"
				>
					Primary
				</UIBadge>

				<UIBadge color="primary">Primary</UIBadge>

				<UIBadge
					color="primary"
					size="sm"
				>
					Primary
				</UIBadge>

				<UIBadge
					color="accent"
					size="lg"
				>
					Accent
				</UIBadge>

				<UIBadge color="accent">Accent</UIBadge>

				<UIBadge
					color="accent"
					size="sm"
				>
					Accent
				</UIBadge>

				<UIBadge
					color="accent"
					variant="tonal"
					size="lg"
				>
					Accent
				</UIBadge>

				<UIBadge
					color="accent"
					variant="tonal"
				>
					Accent
				</UIBadge>

				<UIBadge
					color="accent"
					variant="tonal"
					size="sm"
				>
					Accent
				</UIBadge>
			</UIFlex>

			<UIBreadcrumbs :items="breadcrumbItems" />

			<UIProgressBar
				:value="progress1"
				size="sm"
			/>

			<UIProgressBar :value="progress2" />

			<UIProgressBar
				:value="progress3"
				size="lg"
			/>

			<UIProgressBar
				color="accent"
				:value="progress1"
				show-label
				@click="progress1 -= 10"
			/>

			<UIStepper
				v-model="step"
				:steps="steps"
			/>

			<UIFormItem>
				<template #label>Name</template>
				<UIFormInput
					v-model="form.name"
					placeholder="Name"
				/>
			</UIFormItem>

			<UIFormItem>
				<template #label>Description</template>
				<UIFormTextarea
					v-model="form.description"
					placeholder="Description"
				/>
			</UIFormItem>

			<UIFormItem>
				<template #label>Age</template>
				<UIFormSelect
					v-model="form.age"
					:items="ages"
				/>
			</UIFormItem>
			<slot />
		</div>
	</div>
</template>
