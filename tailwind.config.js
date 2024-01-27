/** @type {import('tailwindcss').Config} */
module.exports = {
	theme: {
		extend: {
			colors: {
				default: '#393646',
				transparent: 'transparent',
				current: 'currentColor'
			}
		}
	},
	content: [
		'./components/**/*.{js,vue,ts}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./nuxt.config.{js,ts}'
	]
}
