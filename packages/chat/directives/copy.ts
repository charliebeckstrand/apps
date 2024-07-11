import type { DirectiveBinding } from 'vue'

export default {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		el.addEventListener('click', async () => {
			try {
				await navigator.clipboard.writeText(binding.value)
			} catch (err) {
				console.error('Failed to copy: ', err)
			}
		})
	}
}
