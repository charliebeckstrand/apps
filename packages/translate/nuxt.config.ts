// https://nuxt.com/docs/api/configuration/nuxt-config

import path from 'path'

export default defineNuxtConfig({
	alias: {
		'@base': path.resolve(__dirname, '../base'),
		'@ui': path.resolve(__dirname, '../ui')
	},
	app: {
		head: {
			title: 'Translate',
			meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
			link: [{ rel: 'icon', type: 'image/png', href: '/translate.png' }]
		}
	},
	components: [{ path: '~/components', pathPrefix: true }],
	css: ['~/assets/css/main.scss'],
	devtools: { enabled: true },
	extends: ['../base', '../ui'],
	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt']
})
