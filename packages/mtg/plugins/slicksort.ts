import { plugin as Slicksort } from 'vue-slicksort'

export default defineNuxtPlugin((nuxtApp) => {
	// You can alternatively use this format, which comes with automatic type support
	return {
		provide: {
			// Provide the plugin instance in the $slicksort property
			$slicksort: Slicksort
		}
	}
})
