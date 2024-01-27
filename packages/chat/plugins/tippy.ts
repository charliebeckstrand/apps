import Tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import 'tippy.js/animations/scale.css'

Tippy.setDefaultProps({
	delay: [250, 0],
	arrow: true,
	theme: 'light',
	placement: 'bottom',
	trigger: 'mouseenter',
	allowHTML: true
})

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive('tippy', {
		beforeMount(el, binding) {
			Tippy(el, binding.value)
		},
		updated(el, binding) {
			el._tippy.setContent(binding.value.content)
		}
	})
})