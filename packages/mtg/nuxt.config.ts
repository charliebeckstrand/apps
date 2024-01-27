import path from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	alias: {
		'@base': path.resolve(__dirname, '../base'),
		'@ui': path.resolve(__dirname, '../ui')
	},
	components: [{ path: '~/components', pathPrefix: true }],
	css: ['~/assets/css/main.scss'],
	extends: ['../base', '../ui'],
	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
	ssr: false,
	typescript: {
		strict: true
	}
})
