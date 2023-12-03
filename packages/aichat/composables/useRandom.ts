import fruits from '@/common/fruits.js'
import vegetables from '@/common/vegetables.js'

export const useRandom = () => {
	const randomIdGenerator = () => {
		const food = [...fruits, ...vegetables]
		const string = `${food[Math.floor(Math.random() * food.length)]}-${
			food[Math.floor(Math.random() * food.length)]
		}-${food[Math.floor(Math.random() * food.length)]}`
		return string
	}

	const randomNameGenerator = () => {
		const words = [
			'Hello',
			'Hi',
			'Hey',
			'Goodbye',
			'Bye',
			'Goodnight',
			'Good morning',
			'Good afternoon',
			'Good evening'
		]

		const string = `${words[Math.floor(Math.random() * words.length)]} ${
			words[Math.floor(Math.random() * words.length)]
		} ${words[Math.floor(Math.random() * words.length)]}`

		return string
	}

	return {
		randomIdGenerator,
		randomNameGenerator
	}
}
