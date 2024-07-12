<script setup lang="ts">
import { PaperClipIcon, XMarkIcon, PaperAirplaneIcon } from '@heroicons/vue/24/outline'

import { useChatgpt } from '@/composables/useChatgpt'
import { useConversationStore } from '@/stores/conversation'

type ExtendedFile = File & { loading?: boolean }

const conversationStore = useConversationStore()

const textareaRef = ref<ComponentPublicInstance | null>(null)
const textareaEl = computed(() => textareaRef.value?.$refs?.textareaRef as HTMLTextAreaElement)

const fileInputRef = ref<HTMLInputElement | null>(null)
const files = ref<ExtendedFile[]>([])

const message = ref('')

const { sendMessage, generateName } = useChatgpt()

const props = defineProps<{
	disabled: boolean
}>()

const setTextareaHeight = () => {
	if (textareaEl.value) {
		textareaEl.value.style.height = textareaEl.value.scrollHeight + 'px'
	}
}

const resetTextareaHeight = () => {
	if (textareaEl.value) {
		textareaEl.value.style.height = 'auto'
	}
}

const focusTextarea = () => {
	if (textareaEl.value) {
		textareaEl.value.focus()
	}
}

const handleSendMessage = async () => {
	const prompt = message.value?.trim()

	if (props.disabled || !conversationStore.selectedConversation) {
		return
	}

	if (!prompt) {
		focusTextarea()
		return
	}

	// Add the user message to the conversation
	conversationStore.addMessage({
		type: 'user',
		value: prompt
	})

	// Clear the message
	message.value = ''

	// Reset the textarea height
	resetTextareaHeight()

	try {
		conversationStore.loadingResponse = true

		// Send the message and get the response
		const { error, data } = await sendMessage(prompt)

		if (error) {
			throw new Error(`${error.message ?? 'Error'}: Please try again.`)
		}

		// Check if the selected conversation exists and if it needs a name
		if (conversationStore.selectedConversation && !conversationStore.selectedConversation.name) {
			const response = await generateName(prompt)
			if (response?.conversationName) {
				conversationStore.selectedConversation.name = response?.conversationName
			}
		}

		if (data?.reply) {
			conversationStore.addMessage({
				type: 'bot',
				value: data.reply
			})
		}
	} catch (error: any) {
		if (error.message) {
			conversationStore.addMessage({
				type: 'system',
				value: error.message
			})
		}
	} finally {
		conversationStore.loadingResponse = false

		nextTick(() => {
			focusTextarea()
		})
	}
}

const handleKeydown = (event: any) => {
	// If the user presses enter and not shift, send the message
	if (event.key === 'Enter' && !event.shiftKey) {
		event.preventDefault()

		handleSendMessage()
	}
}

const handleInput = () => {
	resetTextareaHeight()
	setTextareaHeight()
}

const addFile = () => {
	if (fileInputRef.value) {
		fileInputRef.value.click()
	}
}

const handleFileInput = (event: Event) => {
	const target = event.target as HTMLInputElement

	if (target.files) {
		Array.from(target.files).forEach((file: ExtendedFile) => {
			if (!files.value.some((f) => f.name === file.name)) {
				files.value.push(file)
			}
		})
	}
}
</script>

<template>
	<div class="space-y-4 p-4">
		<div
			v-if="files?.length"
			class="flex items-center gap-2 overflow-x-auto lg:max-w-[calc(100vw-320px-2rem)]"
		>
			<UIBadge
				v-for="file in files"
				:key="file.name"
				rounded="full"
				color="secondary"
				variant="tonal"
				class="whitespace-nowrap"
			>
				<div class="pl-2">{{ file.name }}</div>
				<template #append>
					<UIButton
						v-if="!file.loading"
						v-tippy="{ content: 'Remove file' }"
						icon
						color="danger"
						variant="text"
						size="sm"
						:disabled="props.disabled"
						@click="() => (files = files.filter((f) => f.name !== file.name))"
					>
						<UIIcon :icon="XMarkIcon" />
					</UIButton>
				</template>
			</UIBadge>
		</div>
		<div class="flex items-center rounded-lg border bg-gray-50 pr-2">
			<UIFormTextarea
				ref="textareaRef"
				v-model="message"
				placeholder="Send Message"
				:disabled="props.disabled"
				class="textarea focus:ring-none overflow-x-hidde max-h-36 grow overflow-y-auto bg-transparent focus:placeholder-black focus:outline-none"
				rows="1"
				@keydown="handleKeydown"
				@input="handleInput"
			/>

			<div class="flex items-center space-x-1">
				<template v-if="!conversationStore.loadingResponse">
					<UIButton
						v-tippy="{ content: 'Attach a file' }"
						icon
						variant="text"
						:disabled="props.disabled"
						@click="addFile"
					>
						<UIIcon :icon="PaperClipIcon" />
					</UIButton>
					<input
						v-show="false"
						ref="fileInputRef"
						type="file"
						:multiple="true"
						@change="handleFileInput"
					/>
				</template>
				<template v-if="conversationStore.loadingResponse">
					<div
						class="px-2"
						role="status"
					>
						<svg
							aria-hidden="true"
							class="fill-accent h-6 w-6 animate-spin text-gray-300"
							viewBox="0 0 100 101"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
								fill="currentColor"
							/>
							<path
								d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
								fill="currentFill"
							/>
						</svg>
						<span class="sr-only">Loading...</span>
					</div>
				</template>
				<UIButton
					v-else
					v-tippy="{ content: 'Send message' }"
					icon
					:disabled="props.disabled || !message?.trim()"
					@click="handleSendMessage"
				>
					<UIIcon :icon="PaperAirplaneIcon" />
				</UIButton>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.attached-files-button {
	.files-length {
		display: block;
	}

	.remove-icon {
		display: none;
	}

	&:hover {
		.files-length {
			display: none;
		}

		.remove-icon {
			display: block;
		}
	}
}
</style>
