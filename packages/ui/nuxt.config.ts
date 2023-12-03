// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	components: [
		{
			path: './components/',
			prefix: 'UI',
			pathPrefix: true,
			extensions: ['vue'],
			ignore: ['**/*.test.*', '**/*.spec.*']
		}
	],
	typescript: {
		strict: true
	}
})
