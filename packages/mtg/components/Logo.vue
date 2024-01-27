<script setup>
const animals = [
	'dragon',
	'fish',
	'fox',
	'frog',
	'giraffe',
	'humming-bird',
	'kangaroo',
	'owl',
	'penguin',
	'pig',
	'rabbit',
	'rat',
	'reindeer',
	'shark',
	'sheep',
	'squirrel',
	'swan',
	'turtle',
	'walrus'
]

const randomNumber = (Math.random() * (animals.length - 1)).toFixed()
const randomAnimal = `/animals/${animals[randomNumber]}.png`

const animal = randomAnimal ? randomAnimal : `/animals/${animals[0]}.png`

// if (process.client) {
// 	const favicon = document.getElementById('favicon')

// 	if (animal && favicon) {
// 		favicon.href = animal
// 	}
// }
</script>

<template>
	<router-link to="/">
		<img
			:src="animal"
			class="w-12 hover:scale-105"
		/>
	</router-link>
</template>

<style scoped></style>
