import type { Ref } from 'vue'

interface SpeechSynthesisErrorEvent extends Event {
	error: string
}

const useSpeechSynthesis = () => {
	const synth = window?.speechSynthesis

	const handleSpeechError = ({ error }: SpeechSynthesisErrorEvent) =>
		console[error === 'interrupted' ? 'log' : 'error'](
			`Speech synthesis ${error === 'interrupted' ? 'interrupted' : 'error'}`,
			error
		)

	const prepareAndSpeak = (
		text: string,
		lang: string,
		dictating: Ref<boolean>,
		currentWordIndex: Ref<number>,
		index?: number
	) => {
		if (!text || dictating.value) return

		if (typeof index === 'number') currentWordIndex.value = index // Conditional index update

		synth.cancel() // Ensure no other speech is happening before starting a new one

		const utterance = new SpeechSynthesisUtterance(text)

		Object.assign(utterance, { lang, rate: 1, pitch: 1, volume: 1 })

		utterance.onend = () => {
			currentWordIndex.value = -1 // Reset
			dictating.value = false
		}

		utterance.onerror = (event) => {
			currentWordIndex.value = -1 // Reset on error
			dictating.value = false
			handleSpeechError(event as SpeechSynthesisErrorEvent)
		}

		dictating.value = true

		synth.speak(utterance)
	}

	const speakWord = (
		word: string,
		language: string,
		index: number,
		dictating: Ref<boolean>,
		currentWordIndex: Ref<number>
	) => prepareAndSpeak(word, language, dictating, currentWordIndex, index)

	const speakSentence = (
		sentence: string,
		language: string,
		dictating: Ref<boolean>,
		currentWordIndex: Ref<number>
	) => {
		synth.cancel() // Ensure no other speech is happening

		const words = sentence.split(/[\s,.!?;:()]+/).filter(Boolean) // Split the sentence into words

		dictating.value = true // Set dictating to true

		let currentIndex = 0

		const speakNextWord = () => {
			if (currentIndex >= words.length) {
				currentWordIndex.value = -1 // Reset the current word index

				dictating.value = false

				return
			}

			currentWordIndex.value = currentIndex // Update the current word index

			const word = words[currentIndex] // Get the current word
			const utterance = new SpeechSynthesisUtterance(word)

			utterance.lang = language

			utterance.onend = () => {
				currentIndex++ // Move to the next word

				speakNextWord()
			}

			utterance.onerror = (event) => handleSpeechError(event)

			synth.speak(utterance)
		}

		speakNextWord() // Start speaking the words
	}

	return {
		speakWord,
		speakSentence
	}
}

export default useSpeechSynthesis
