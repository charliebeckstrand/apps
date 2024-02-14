<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRecipesStore } from '@/stores/recipes'

const authStore = useAuthStore()
const recipesStore = useRecipesStore()

// recipesStore.recipes = [
// 	{
// 		id: 1,
// 		name: 'French Toast',
// 		description:
// 			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultrices, nunc nisl aliquet nunc, nec aliquam nisl nunc eget nunc. Donec euismod, nisl eget aliquam ultrices, nunc nisl aliquet nunc, nec aliquam nisl nunc eget nunc.',
// 		thumbnail:
// 			'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2008/3/26/0/IE0309_French-Toast.jpg.rend.hgtvcom.1280.1280.suffix/1431730431340.jpeg',
// 		prepTime: 10,
// 		cookTime: 10,
// 		servings: 4,
// 		ingredients: [
// 			{
// 				name: 'Ingredient 1',
// 				quantity: 1,
// 				unit: 'cup'
// 			},
// 			{
// 				name: 'Ingredient 2',
// 				quantity: 2,
// 				unit: 'cup'
// 			}
// 		],
// 		instructions: [
// 			{
// 				description:
// 					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultrices, nunc nisl aliquet nunc, nec aliquam nisl nunc eget nunc. Donec euismod, nisl eget aliquam ultrices, nunc nisl aliquet nunc, nec aliquam nisl nunc eget nunc.'
// 			},
// 			{
// 				description:
// 					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultrices, nunc nisl aliquet nunc, nec aliquam nisl nunc eget nunc. Donec euismod, nisl eget aliquam ultrices, nunc nisl aliquet nunc, nec aliquam nisl nunc eget nunc.'
// 			}
// 		],
// 		notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultrices, nunc nisl aliquet nunc, nec aliquam nisl nunc eget nunc.'
// 	},
// 	{
// 		id: 2,
// 		name: 'Pancakes',
// 		description:
// 			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultrices, nunc nisl aliquet nunc, nec aliquam nisl nunc eget nunc. Donec euismod, nisl eget aliquam ultrices, nunc nisl aliquet nunc, nec aliquam nisl nunc eget nunc.',
// 		thumbnail: 'https://joyfoodsunshine.com/wp-content/uploads/2022/08/chocolate-chip-pancakes-1.jpg',
// 		prepTime: 15,
// 		cookTime: 10,
// 		servings: 6,
// 		ingredients: [
// 			{
// 				name: 'Ingredient 1',
// 				quantity: 1,
// 				unit: 'cup'
// 			},
// 			{
// 				name: 'Ingredient 2',
// 				quantity: 2,
// 				unit: 'cup'
// 			}
// 		],
// 		instructions: [
// 			{
// 				description:
// 					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultrices, nunc nisl aliquet nunc, nec aliquam nisl nunc eget nunc. Donec euismod, nisl eget aliquam ultrices, nunc nisl aliquet nunc, nec aliquam nisl nunc eget nunc.'
// 			},
// 			{
// 				description:
// 					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultrices, nunc nisl aliquet nunc, nec aliquam nisl nunc eget nunc. Donec euismod, nisl eget aliquam ultrices, nunc nisl aliquet nunc, nec aliquam nisl nunc eget nunc.'
// 			}
// 		]
// 	},
// 	{
// 		id: 3,
// 		name: 'Waffles',
// 		description:
// 			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultrices, nunc nisl aliquet nunc, nec aliquam nisl nunc eget nunc. Donec euismod, nisl eget aliquam ultrices, nunc nisl aliquet nunc, nec aliquam nisl nunc eget nunc.',
// 		thumbnail:
// 			'https://stordfkenticomedia.blob.core.windows.net/df-us/rms/media/recipemediafiles/recipes/retail/x17/2020_belgian-style-waffles_16700_600x600.jpg?ext=.jpg',
// 		prepTime: 20,
// 		cookTime: 10,
// 		servings: 4,
// 		ingredients: [
// 			{
// 				name: 'Ingredient 1',
// 				quantity: 1,
// 				unit: 'cup'
// 			},
// 			{
// 				name: 'Ingredient 2',
// 				quantity: 2,
// 				unit: 'cup'
// 			}
// 		],
// 		instructions: [
// 			{
// 				description:
// 					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultrices, nunc nisl aliquet nunc, nec aliquam nisl nunc eget nunc. Donec euismod, nisl eget aliquam ultrices, nunc nisl aliquet nunc, nec aliquam nisl nunc eget nunc.'
// 			},
// 			{
// 				description:
// 					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultrices, nunc nisl aliquet nunc, nec aliquam nisl nunc eget nunc. Donec euismod, nisl eget aliquam ultrices, nunc nisl aliquet nunc, nec aliquam nisl nunc eget nunc.'
// 			}
// 		]
// 	}
// ]
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>
