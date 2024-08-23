<script setup lang="ts">
import Heading from '@/components/heading/Index.vue'
import Overlay from '@/components/overlay/Index.vue'

import { computed, onUnmounted, ref, watch, toRefs } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'

import { usePadding } from '@/composables/usePadding'
import { useSize } from '@/composables/dialog/useSize'
import { useTailwindClasses } from '@/composables/useTailwindClasses'

import type { Padding, Size } from '@/types/dialog'

type Emit = {
	(event: 'update:modelValue', value: boolean): void
}

interface Props {
	modelValue: boolean
	padding?: Padding
	size?: Size
}

const emit = defineEmits<Emit>()

const props = withDefaults(defineProps<Props>(), {
	modelValue: false,
	padding: 'md',
	size: 'md'
})

const { modelValue, padding, size } = toRefs(props)

const dialogRef = ref<HTMLElement | null>(null)

const isOpen = computed({
	get: () => modelValue.value,
	set: (value) => {
		emit('update:modelValue', value)
	}
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
				ref="dialogRef"
				as="div"
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
					<Overlay />
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
							<DialogPanel
								:class="[
									useTailwindClasses([usePadding(padding), useSize(size)]),
									'w-full transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all'
								]"
							>
								<Heading
									size="lg"
									weight="bold"
								>
									<slot name="title" />
								</Heading>

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
