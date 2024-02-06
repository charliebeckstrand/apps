<script setup lang="ts">
import translate from 'translate'
import debounce from 'lodash/debounce'
import { ref, watch, onMounted } from 'vue'
import { ArrowsRightLeftIcon } from '@heroicons/vue/24/solid'

import { languages } from '@/common/languages'

const fromLanguage = ref()
const toLanguage = ref()
const fromText = ref()
const toText = ref()

const translateText = async (text: string, from: string, to: string) => {
	if (!text) return

	try {
		return await translate(text, { from, to })
	} catch (error) {
		console.error('Error during translation:', error)
		return ''
	}
}

const updateText = debounce(async () => {
	if (!fromText.value) return

	const response = await translateText(fromText.value, fromLanguage.value.value, toLanguage.value.value)

	toText.value = response || ''
}, 500)

const swapLanguages = () => {
	const temp = fromLanguage.value // temporary variable to hold the value of fromLanguage

	fromLanguage.value = toLanguage.value
	toLanguage.value = temp
}

watch(fromLanguage, async (newVal, oldVal) => {
	try {
		if (newVal === toLanguage.value) {
			toLanguage.value = oldVal
		}

		const response = await translateText(fromText.value, oldVal.value, newVal.value)

		fromText.value = response || ''
	} catch (error) {
		console.error('Error in fromLanguage watcher:', error)
	}
})

watch(toLanguage, async (newVal, oldVal) => {
	try {
		if (newVal === fromLanguage.value) {
			fromLanguage.value = oldVal
		}

		const response = await translateText(toText.value, oldVal.value, newVal.value)

		toText.value = response || ''
	} catch (error) {
		console.error('Error in toLanguage watcher:', error)
	}
})

const loaded = ref(false)

onMounted(async () => {
	const english = languages.find((language) => language.value === 'en')
	const spanish = languages.find((language) => language.value === 'es')

	fromLanguage.value = english
	toLanguage.value = spanish

	loaded.value = true
})
</script>
<template>
	<div
		v-if="loaded"
		class="flex h-full flex-col lg:flex-row"
	>
		<div class="flex h-full flex-1 flex-col space-y-5 bg-gray-500 p-5">
			<div class="flex items-center space-x-3">
				<div class="flex-1">
					<UIFormGroup>
						<UIFormLabel
							for="fromLanguage"
							class="hidden"
						>
							From
						</UIFormLabel>
						<LanguageCombobox
							id="fromLanguage"
							v-model="fromLanguage"
						/>
					</UIFormGroup>
				</div>
				<UIButton
					v-tippy="{ content: 'Swap Language', animation: 'perspective' }"
					icon
					color="white"
					@click="swapLanguages"
				>
					<UIIcon :icon="ArrowsRightLeftIcon" />
				</UIButton>
			</div>
			<div class="flex grow">
				<UIFormLabel
					for="fromText"
					class="hidden"
				>
					Text to translate
				</UIFormLabel>
				<UIFormTextarea
					id="fromText"
					v-model="fromText"
					class="grow"
					placeholder="Text to translate"
					@input="updateText"
				/>
			</div>
		</div>
		<div class="flex h-full flex-1 flex-col space-y-5 p-5">
			<div class="flex items-center space-x-3">
				<div class="flex-1">
					<UIFormGroup>
						<UIFormLabel
							for="toLanguage"
							class="hidden"
						>
							To
						</UIFormLabel>
						<LanguageCombobox
							id="toLanguage"
							v-model="toLanguage"
						/>
					</UIFormGroup>
				</div>
			</div>
			<div class="flex grow rounded-md p-3 shadow-md">
				<div class="selection:bg-secondary">
					{{ toText }}
				</div>
			</div>
		</div>
	</div>
</template>
