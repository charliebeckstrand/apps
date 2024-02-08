<script setup lang="ts">
import translate from 'translate'
import cloneDeep from 'lodash/cloneDeep'
import debounce from 'lodash/debounce'
import { ref, watch, onMounted } from 'vue'
import { ArrowsRightLeftIcon, LanguageIcon, PlayIcon, StopIcon } from '@heroicons/vue/24/solid'

import { languages } from '@/common/languages'

const from = reactive({
	language: {
		value: 'en',
		label: 'English'
	},
	text: ''
})

const to = reactive({
	language: {
		value: 'es',
		label: 'Spanish'
	},
	text: '',
	words: []
})

const translateText = async (text: string, from: string, to: string) => {
	if (!text) return

	try {
		return await translate(text, { from, to })
	} catch (error) {
		console.error('Error during translation:', error)
		return ''
	}
}

const setValues = (response: any) => {
	// Use a regex to split the response into an array of words, accounting for punctuation
	// The regex: /[\s,.!?;:()]+/ will split the string at spaces and punctuation marks
	// Adjust the regex as needed to include or exclude specific punctuation characters
	const regex = /[\s,.!?;:()]+/

	// toWords assignment if you need the response as an array of words
	to.words = response ? response.split(regex).filter(Boolean) : []

	// toText assignment if you need the response as a string
	to.text = response
}

const updateText = debounce(async () => {
	if (!from.text) return

	const response = await translateText(from.text, from.language.value, to.language.value)

	setValues(response)
}, 500)

const dictationMode = ref(false)
const dictating = ref(false)

const speakWord = (word: string, language: string) => {
	if (!word || dictating.value) return

	const synth = window.speechSynthesis

	// Stop any ongoing speech to prevent overlap
	synth.cancel()

	const utterance = new SpeechSynthesisUtterance(word)

	utterance.lang = language // Set the language to match the word's language
	utterance.rate = 1 // Speed of the speech, range [0.1 - 10]
	utterance.pitch = 1 // Pitch of the speech, range [0 - 2]
	utterance.volume = 1 // Volume of the speech, range [0 - 1]

	utterance.onstart = () => {
		console.log('Speech synthesis started')
		dictating.value = true
	}
	utterance.onend = () => {
		console.log('Speech synthesis finished')
		dictating.value = false
	}
	utterance.onerror = (event) => console.error('Speech synthesis error', event)

	// Speak the word
	synth.speak(utterance)
}

const speakSentence = (sentence: string, language: string) => {
	const synth = window.speechSynthesis
	synth.cancel() // Stop any ongoing speech

	const utterance = new SpeechSynthesisUtterance(sentence)

	utterance.lang = language
	utterance.rate = 1
	utterance.pitch = 1
	utterance.volume = 1

	// Add event listeners as necessary
	utterance.onstart = () => {
		console.log('Speech synthesis started')
		dictating.value = true
	}
	utterance.onend = () => {
		console.log('Speech synthesis finished')
		dictating.value = false
	}
	utterance.onerror = (event) => {
		console.error('Speech synthesis error', event)
		dictating.value = false
	}

	synth.speak(utterance)
}

const startDictation = () => {
	speakSentence(to.text, to.language.value)
}

const stopDictation = () => {
	const synth = window.speechSynthesis

	synth.cancel()

	dictating.value = false
}

const toggleDictationMode = () => {
	dictationMode.value = !dictationMode.value
	dictating.value = false

	stopDictation()
}

const swapLanguages = () => {
	const clone = cloneDeep(from.language)

	from.language = to.language
	to.language = clone
}

const handleLanguageChange = async (newVal: string, oldVal: string, fromSide: string) => {
	const target = fromSide === 'from' ? from : to
	const opposite = fromSide === 'from' ? to : from

	if (newVal === opposite.language.value) {
		const oldLang = languages.find((lang) => lang.value === oldVal)

		opposite.language = { value: oldVal, label: oldLang?.label ?? '' }
	}

	if (!target.text) return

	try {
		const response = await translateText(target.text, oldVal, newVal)

		if (response) {
			fromSide === 'to' ? setValues(response) : (target.text = response)
		}
	} catch (error) {
		console.error(`Error in ${fromSide}.language.value watcher:`, error)
	}
}

watch(
	() => from.language.value,
	(newVal, oldVal) => handleLanguageChange(newVal, oldVal, 'from')
)

watch(
	() => to.language.value,
	(newVal, oldVal) => handleLanguageChange(newVal, oldVal, 'to')
)

const loaded = ref(false)

onMounted(async () => {
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
							v-model="from.language"
						/>
					</UIFormGroup>
				</div>
				<UIButton
					v-tippy="{ content: 'Swap Language', animation: 'perspective' }"
					icon
					color="white"
					@click="swapLanguages"
					@keydown.space.prevent="swapLanguages"
					@keydown.enter.prevent="swapLanguages"
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
					v-model="from.text"
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
							v-model="to.language"
						/>
					</UIFormGroup>
				</div>
				<template v-if="dictationMode && dictating">
					<UIButton
						color="danger"
						variant="tonal"
						v-tippy="{ content: 'Stop Dictation' }"
						icon
						@click="stopDictation"
					>
						<UIIcon :icon="StopIcon" />
					</UIButton>
				</template>
				<template v-else-if="dictationMode && !dictating">
					<UIButton
						color="primary"
						variant="tonal"
						v-tippy="{ content: 'Start Dictation' }"
						icon
						@click="startDictation"
					>
						<UIIcon :icon="PlayIcon" />
					</UIButton>
				</template>
				<UIButton
					v-if="to.text.length"
					v-tippy="{ content: 'Dictation Mode' }"
					icon
					:class="{ 'bg-gray-200 hover:bg-gray-300': dictationMode }"
					@click="toggleDictationMode"
				>
					<UIIcon :icon="LanguageIcon" />
				</UIButton>
			</div>
			<div class="flex grow rounded-md p-3 shadow-md">
				<div class="selection:bg-secondary space-x-2">
					<template v-if="dictationMode">
						<Word
							v-for="(word, index) in to.words"
							:key="index"
							:interactive="!dictating"
							@click="speakWord(word, to.language.value)"
						>
							{{ word }}
						</Word>
					</template>
					<template v-else>
						{{ to.text }}
					</template>
				</div>
			</div>
		</div>
	</div>
</template>
