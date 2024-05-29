<script setup lang="ts">
import translate from 'translate'
import cloneDeep from 'lodash/cloneDeep'
import debounce from 'lodash/debounce'

import { ref, watch, onMounted } from 'vue'
import { ArrowsRightLeftIcon, LanguageIcon, PlayIcon, StopIcon } from '@heroicons/vue/24/solid'

import { languages } from '@/common/languages'

import type { Language } from '@/types/language'

const from: { language: Language; text: string } = reactive({
	language: {} as Language,
	text: ''
})

const to: { language: Language; text: string; words: string[] } = reactive({
	language: {} as Language,
	text: '',
	words: []
})

const { speakWord, speakSentence } = useSpeechSynthesis()

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
	const regex = /[\s,.!?;:()]+/

	if (response) {
		to.words = response.split(regex) // toWords assignment if you need the response as an array of words
		to.text = response // toText assignment if you need the response as a string
	} else {
		to.words = []
		to.text = ''
	}
}

const updateText = debounce(async () => {
	stopDictation() // Stop dictation when the text changes

	if (from.text) {
		const response = await translateText(from.text, from.language.iso, to.language.iso)

		setValues(response)
	} else {
		setValues(undefined)
	}
}, 250)

const currentWordIndex = ref(-1)
const dictationMode = ref(false)
const dictating = ref(false)

const synth = window?.speechSynthesis

const startDictation = () => {
	dictating.value = true

	speakSentence(to.text, to.language.iso, dictating, currentWordIndex)
}

const startWordDictation = (word: string, index: number) => {
	speakWord(word, to.language.iso, index, dictating, currentWordIndex)
}

const stopDictation = () => {
	synth.cancel() // Stop speaking

	dictating.value = false

	currentWordIndex.value = -1 // Reset the word index
}

const toggleDictationMode = () => {
	stopDictation() // Stop dictation when the mode changes

	dictating.value = false

	dictationMode.value = !dictationMode.value // Toggle dictation mode
}

const swapLanguages = () => {
	const clone = cloneDeep(from.language)

	from.language = to.language
	to.language = clone
}

const handleLanguageChange = async (newVal: string, oldVal: string, fromSide: string) => {
	stopDictation() // Stop dictation when the language changes

	const target = fromSide === 'from' ? from : to
	const opposite = fromSide === 'from' ? to : from

	if (newVal === opposite.language.iso) {
		const oldLang = languages.find((lang) => lang.iso === oldVal) || ({} as Language)

		opposite.language = { iso: oldVal, label: oldLang?.label, value: oldLang?.value }
	}

	if (!target.text) return

	try {
		const response = await translateText(target.text, oldVal, newVal)

		if (response) {
			fromSide === 'to' ? setValues(response) : (target.text = response)
		}
	} catch (error) {
		console.error(`Error in ${fromSide}.language.iso watcher:`, error)
	}
}

watch(
	() => from.language.iso,
	(newVal, oldVal) => handleLanguageChange(newVal, oldVal, 'from')
)

watch(
	() => to.language.iso,
	(newVal, oldVal) => handleLanguageChange(newVal, oldVal, 'to')
)

const loaded = ref(false)

onMounted(async () => {
	const english = languages.find((lang) => lang.iso === 'en') || ({} as Language)
	const spanish = languages.find((lang) => lang.iso === 'es') || ({} as Language)

	from.language = english // Default from language
	to.language = spanish // Default to language

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
					v-tippy="{ content: 'Swap Language' }"
					icon
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
							:class="{ 'bg-primary/50': currentWordIndex === index }"
							:interactive="!dictating"
							@click="startWordDictation(word, index)"
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
