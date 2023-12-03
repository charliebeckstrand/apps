// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	extends: ['../ui'],
	alias: {
		'@': './'
	},
	css: ['~/assets/css/main.scss'],
	components: [{ path: '~/components', pathPrefix: true }],
	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
	ssr: false,
	typescript: {
		strict: true
	}
})
