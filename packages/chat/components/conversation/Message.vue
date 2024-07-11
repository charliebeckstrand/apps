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

const setRef = (component: any) => {
	nextTick(() => {
		if (!component || !component?.$el) return

		const element = component.$el

		element.scrollIntoViewIfNeeded()
	})
}

const parseMarkdown = (markdown: string) => {
	const md = new MarkdownIt({
		html: true,
		typographer: true,
		linkify: true,
		breaks: true
	})

	const tokens = md.parse(markdown, {})
	const parsedContent: any = []
	const codeBlocks: any = []

	tokens.forEach((token, _) => {
		if (token.type === 'fence') {
			codeBlocks.push({
				lang: token.info.trim(),
				code: token.content
			})
			parsedContent.push({ type: 'code-block', index: codeBlocks.length - 1 })
		} else {
			parsedContent.push({ type: 'html', content: md.renderer.render([token], md.options, {}) })
		}
	})

	return { parsedContent, codeBlocks }
}

const { parsedContent, codeBlocks } = parseMarkdown(props.message.value)
</script>

<template>
	<UICard
		:ref="setRef"
		:color="messageColor"
		:variant="messageVariant"
	>
		<div
			v-for="content in parsedContent"
			:key="content.index"
		>
			<template v-if="content.type === 'html'">
				<div v-html="content.content"></div>
			</template>
			<template v-else-if="content.type === 'code-block'">
				<CodeBlock
					:code="codeBlocks[content.index].code"
					:lang="codeBlocks[content.index].lang"
				/>
			</template>
		</div>
	</UICard>
</template>
