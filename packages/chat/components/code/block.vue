<script setup lang="ts">
import hljs from 'highlight.js'
import { CheckIcon, ClipboardIcon } from '@heroicons/vue/24/solid'

type Props = {
	lang: string
	code: string
}

const props = withDefaults(defineProps<Props>(), {
	lang: 'plaintext',
	code: ''
})

const copied = ref(false)

const highlightedCode = ref('')

if (props.lang && hljs.getLanguage(props.lang)) {
	highlightedCode.value = hljs.highlight(props.code, { language: props.lang }).value
} else {
	highlightedCode.value = hljs.highlightAuto(props.code).value
}

const copy = () => {
	copied.value = true

	setTimeout(() => {
		copied.value = false
	}, 2000)
}
</script>

<template>
	<div class="relative hljs language-{{ lang }} my-4 p-2 rounded-lg overflow-x-auto max-w-full">
		<pre><code v-html="highlightedCode"></code></pre>
		<UIButton
			variant="text"
			:color="copied ? 'success' : 'secondary'"
			class="copy-btn absolute right-2 top-2"
			rounded="full"
			:icon="!copied"
			size="sm"
			v-copy="code"
			:disabled="copied"
			@click="copy"
		>
			<span
				v-if="copied"
				class="text-sm"
			>
				Copied!
			</span>
			<ClipboardIcon
				v-else
				class="h-4 w-4"
			/>
		</UIButton>
	</div>
</template>
