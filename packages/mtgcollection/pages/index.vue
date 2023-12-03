<script setup lang="ts">
const cards = ref([])

const addCard = (card: any) => {
	cards.value.push(card)
}
</script>
<template>
	<div class="space-y-5 p-5">
		<CardSearch @add="addCard" />

		<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
			<div
				v-for="card in cards"
				:key="card.id"
				class="flex items-center space-x-3"
			>
				<img
					:src="card.image_uris.border_crop"
					:alt="card.name"
					class="w-full"
				/>
			</div>
		</div>
	</div>
</template>
