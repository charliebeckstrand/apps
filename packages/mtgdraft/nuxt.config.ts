import path from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	alias: {
		'@base': path.resolve(__dirname, '../base'),
		'@ui': path.resolve(__dirname, '../ui')
	},
	extends: ['../base', '../ui'],
	css: ['~/assets/css/main.scss'],
	components: [{ path: '~/components', pathPrefix: true }],
	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
	ssr: false,
	typescript: {
		strict: true
	}
})
