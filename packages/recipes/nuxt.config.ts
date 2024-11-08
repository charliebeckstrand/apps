// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
	app: {
		head: {
			title: 'Recipes',
			meta: [
				{ charset: 'utf-8' },
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1'
				}
			],
			link: [{ rel: 'icon', type: 'image/png', href: '/bowl.png' }]
		}
	},
	components: [{ path: '~/components', pathPrefix: true }],
	css: ['~/assets/css/main.scss'],
	devtools: { enabled: true },
	extends: ['../base', '../ui'],
	compatibilityDate: '2024-08-29'
})
