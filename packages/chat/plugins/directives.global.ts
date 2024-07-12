import copy from '@/directives/copy'

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive('copy', copy)
})
