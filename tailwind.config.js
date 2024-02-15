/** @type {import('tailwindcss').Config} */
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
				default: '#393646',
				transparent: 'transparent',
				current: 'currentColor'
			}
		}
	}
}
