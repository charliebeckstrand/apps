<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

import type { Message } from '@/types/message'

type Color = 'primary' | 'secondary' | 'accent' | 'gray'
type Variant = 'default' | 'outlined' | 'tonal'

interface Props {
	message: Message
	color?: Color
	variant?: Variant
}

const props = withDefaults(defineProps<Props>(), {
	message: undefined,
	color: 'gray',
	variant: 'default'
})

const messageVariant = computed(() => {
	if (props.message.type === 'system') {
		return 'tonal'
	}

	return 'default'
})

const messageColor = computed(() => {
	if (props.message.type === 'bot') {
		return 'primary'
	}

	if (props.message.type === 'system') {
		return 'danger'
	}

	if (props.message.type === 'user') {
		return 'light'
	}
})

const setRef = (element: any) => {
	nextTick(() => {
		if (!element) return

		element.scrollIntoViewIfNeeded()
	})
}

const highlightMessage = (message: any) => {
	const md = new MarkdownIt({
		html: true,
		typographer: true,
		linkify: true,
		breaks: true,
		highlight: (str: string, lang: string) => {
			let value, languageName
			if (lang && hljs.getLanguage(lang)) {
				;({ value } = hljs.highlight(str, { language: lang }))
				languageName = lang
			} else {
				;({ value, language: languageName } = hljs.highlightAuto(str))
				languageName = languageName || 'plaintext'
			}

			return `<pre class="hljs language-${languageName} my-4 p-2 rounded-lg overflow-x-auto max-w-full"><code>${value}</code></pre>`
		}
	})

	const markdown = md.render(message)

	const addTargetBlankToMarkdownLinks = (markdown: string) =>
		markdown.replace(/<a href="(.*?)">(.*?)<\/a>/g, `<a href="$1" target="_blank">$2</a>`)

	return addTargetBlankToMarkdownLinks(markdown)
}
</script>

<template>
	<UICard
		:ref="setRef"
		:variant="messageVariant"
		:color="messageColor"
	>
		<div v-html="highlightMessage(props.message.value)" />
	</UICard>
</template>
