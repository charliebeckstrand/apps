// https://nuxt.com/docs/api/configuration/nuxt-config

import path from 'path'

export default defineNuxtConfig({
	alias: {
		'@base': path.resolve(__dirname, './')
	},
	css: ['@base/assets/css/main.scss'],
	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
	typescript: {
		strict: true
	}
})
