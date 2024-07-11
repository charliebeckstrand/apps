import copy from '@/directives/copy'

export default defineNuxtPlugin((nuxtApp) => {
	console.log('Global directives')
	nuxtApp.vueApp.directive('copy', copy)
})
