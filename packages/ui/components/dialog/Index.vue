<script setup lang="ts">
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'

import type { Padding, Size } from '@/types/dialog'

type Emit = {
	(event: 'update:modelValue', value: boolean): void
}

interface Props {
	modelValue: boolean
	size?: Size
	padding?: Padding
}

const emit = defineEmits<Emit>()

const props = withDefaults(defineProps<Props>(), {
	modelValue: false,
	size: 'md',
	padding: 'md'
})

const dialogRef = ref<HTMLElement | null>(null)

const isOpen = computed({
	get: () => props.modelValue,
	set: (value) => {
		emit('update:modelValue', value)
	}
})

const classes = computed(() => {
	const paddingMap: Record<Padding, string> = {
		sm: 'p-3',
		md: 'p-4',
		lg: 'p-5'
	}

	const sizeMap: Partial<Record<Size, string>> = {
		sm: 'max-w-sm',
		md: 'max-w-md',
		lg: 'max-w-lg',
		xl: 'max-w-xl',
		'2xl': 'max-w-2xl',
		'3xl': 'max-w-3xl',
		'4xl': 'max-w-4xl'
	}

	const classes = [
		'w-full transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all'
	]

	if (props.padding) {
		classes.push(paddingMap[props.padding])
	}

	if (props.size) {
		const size = sizeMap[props.size]

		if (size) {
			classes.push(size)
		}
	}

	return classes.join(' ')
})

const closeDialog = () => {
	isOpen.value = false

	emit('update:modelValue', false)
}

const keydownEsc = (event: KeyboardEvent) => {
	if (event.key === 'Escape') {
		closeDialog()
	}
}

const addEscKeyEventListener = () => {
	window.addEventListener('keydown', keydownEsc)
}

const removeEscKeyEventListener = () => {
	window.removeEventListener('keydown', keydownEsc)
}

watch(isOpen, (value) => {
	if (value) {
		addEscKeyEventListener()
	} else {
		removeEscKeyEventListener()
	}
})

onUnmounted(() => {
	removeEscKeyEventListener()
})
</script>

<template>
	<div>
		<TransitionRoot
			appear
			:show="isOpen"
			as="template"
		>
			<Dialog
				as="div"
				ref="dialogRef"
				class="relative"
				:initial-focus="dialogRef"
				@close="closeDialog"
			>
				<TransitionChild
					as="template"
					enter="duration-300 ease-out"
					enter-from="opacity-0"
					enter-to="opacity-100"
					leave="duration-200 ease-in"
					leave-from="opacity-100"
					leave-to="opacity-0"
				>
					<UIOverlay />
				</TransitionChild>

				<div class="fixed inset-0 z-50 overflow-y-auto">
					<div class="flex min-h-full items-center justify-center p-4 text-center">
						<TransitionChild
							as="template"
							enter="duration-300 ease-out"
							enter-from="opacity-0 scale-95"
							enter-to="opacity-100 scale-100"
							leave="duration-200 ease-in"
							leave-from="opacity-100 scale-100"
							leave-to="opacity-0 scale-95"
						>
							<DialogPanel :class="classes">
								<UIHeading
									size="lg"
									weight="bold"
								>
									<slot name="title" />
								</UIHeading>

								<slot />

								<slot name="actions" />
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</TransitionRoot>
	</div>
</template>
