// https://nuxt.com/docs/api/configuration/nuxt-config

import path from 'path'

export default defineNuxtConfig({
	alias: {
		'@ui': path.resolve(__dirname, './')
	},
	components: [
		{
			path: './components/',
			prefix: 'UI',
			pathPrefix: true,
			extensions: ['vue'],
			ignore: ['**/*.test.*', '**/*.spec.*']
		}
	]
})
