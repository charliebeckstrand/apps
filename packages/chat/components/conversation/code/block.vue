<script setup lang="ts">
import hljs from 'highlight.js'
import { ArrowsPointingInIcon, ArrowsPointingOutIcon, ClipboardIcon } from '@heroicons/vue/24/outline'

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

const expanded = ref(false)

const copy = () => {
	copied.value = true

	setTimeout(() => {
		copied.value = false
	}, 2000)
}
</script>

<template>
	<div class="code-block mt-4 items-center border-l border-[#666] pl-4">
		<div
			:class="[
				`hljs relative mb-4 max-w-full overflow-x-auto rounded-lg p-2 language-${lang}`,
				{ 'inline-flex': !expanded, 'flex-1': expanded }
			]"
		>
			<pre class="whitespace-pre-wrap"><code v-html="highlightedCode"></code></pre>
		</div>
		<div class="icons mb-4 flex space-x-1">
			<UIButton
				v-tippy="{ content: copied ? 'Copied!' : 'Copy to clipboard' }"
				v-copy="code"
				variant="tonal"
				:color="copied ? 'success' : 'white'"
				class="copy-btn"
				rounded="full"
				:icon="!copied"
				size="sm"
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
			<UIButton
				v-tippy="{ content: expanded ? 'Collapse' : 'Expand' }"
				variant="tonal"
				color="white"
				icon
				size="sm"
				@click="expanded = !expanded"
			>
				<ArrowsPointingInIcon
					v-if="expanded"
					class="h-4 w-4"
				/>
				<ArrowsPointingOutIcon
					v-else
					class="h-4 w-4"
				/>
			</UIButton>
		</div>
	</div>
</template>

<style lang="scss">
.hljs {
	.hljs-string {
		word-break: break-all;
	}
}
</style>
