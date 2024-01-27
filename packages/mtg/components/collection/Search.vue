<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/solid'

import { debounce } from 'lodash'

const show = ref(true)

const searchTerm = ref('')
const cards = ref([])

const searching = ref(false)

// watch search term and clear cards if empty
watch(searchTerm, (value) => {
	if (!cards.value?.length) {
		searching.value = true
	}
	if (!value.length) {
		cards.value = []
	}
})

const search = async () => {
	// searching.value = true

	const response = await fetch(`https://api.scryfall.com/cards/search?q=${searchTerm.value}`)

	const data = await response.json()

	cards.value = data.data

	searching.value = false
}

const debounceSearch = debounce(search, 1000) // wait 1 second before calling searchCards

const textToHtml = (text: string) => {
	const html = text.replace(/\n/g, '<br />')

	return html
}

const emits = defineEmits(['add'])

const addCard = (card: any) => {
	show.value = false
	emits('add', card)
}
</script>

<template>
	<div class="relative w-full">
		<div class="relative flex items-center">
			<UIFormInput
				v-model="searchTerm"
				size="lg"
				placeholder="Card Name"
				class="bg-white hover:placeholder-gray-500 focus:placeholder-black"
				@input="debounceSearch"
				@focus="show = true"
			/>

			<div
				v-if="searchTerm.length"
				class="absolute right-3 ml-auto"
			>
				<UIIcon
					:icon="XMarkIcon"
					size="lg"
					class="cursor-pointer text-gray-500 hover:text-gray-700"
					@click="searchTerm = ''"
				/>
			</div>
		</div>

		<div
			v-if="show && searchTerm.length"
			class="card-list absolute my-3 w-full overflow-y-auto rounded bg-white p-4"
		>
			<div v-if="searching">Searching...</div>
			<div
				v-else
				class="space-y-4"
			>
				<div
					v-for="card in cards"
					:key="card.id"
					class="flex cursor-pointer items-center space-x-5 rounded-lg p-4 hover:shadow-xl"
					@click="addCard(card)"
				>
					<img
						:src="card.image_uris.border_crop"
						:alt="card.name"
						width="100"
					/>

					<div>
						<div class="text-lg font-bold">{{ card.name }}</div>
						<div class="mb-2">{{ card.type_line }}</div>
						<div
							v-html="textToHtml(card.oracle_text)"
							class="text-sm lg:max-w-[75%]"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.card-list {
	max-height: calc(100dvh - 100px);
}
</style>
