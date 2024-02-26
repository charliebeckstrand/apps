/** @type {import('tailwindcss').Config} */
import { colors } from 'tailwindcss/colors'

module.exports = {
	content: [
		'./components/**/*.{js,vue,ts}',
		'./constants/**/*.{js,ts}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./nuxt.config.{js,ts}'
	],
	theme: {
		extend: {
			colors: {
				...colors,
				default: '#393646',
				transparent: 'transparent',
				current: 'currentColor'
			}
		}
	}
}
