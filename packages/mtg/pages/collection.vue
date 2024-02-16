<script setup lang="ts">
type Card = {
	id: string
	name: string
	image_uris: {
		border_crop: string
	}
}

const cards = ref([]) as Ref<Card[]>

const addCard = (card: Card) => {
	if (card) {
		cards.value.push(card)
	}
}
</script>
<template>
	<div class="h-full space-y-4 p-4">
		<CollectionSearch @add="addCard" />

		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
			<div
				v-for="card in cards"
				:key="card.id"
				class="flex items-center space-x-2"
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
