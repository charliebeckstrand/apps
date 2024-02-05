<script setup lang="ts">
import translate from 'translate'
import { ref, reactive, watch, onMounted } from 'vue'
import { debounce } from 'lodash'
import { ArrowsRightLeftIcon, Bars2Icon } from '@heroicons/vue/24/solid'

const languages = reactive([
	{ value: 'en', label: 'English' },
	{ value: 'es', label: 'Spanish' }
])

const fromLanguage = ref('en')
const toLanguage = ref('es')

const fromText = ref()
const toText = ref()

const translateText = async (text: string, from: string, to: string) => {
	if (!text) return

	return await translate(text, { from, to })
}

const updateText = debounce(async () => {
	if (!fromText.value) return

	toText.value = await translateText(fromText.value, fromLanguage.value, toLanguage.value)
}, 500)

const swapLanguages = () => {
	fromLanguage.value = toLanguage.value
	toLanguage.value = fromLanguage.value
}

watch(fromLanguage, async (newVal, oldVal) => {
	if (newVal === toLanguage.value) {
		toLanguage.value = oldVal
	}

	fromText.value = await translateText(fromText.value, oldVal, newVal)
})

watch(toLanguage, async (newVal, oldVal) => {
	if (newVal === fromLanguage.value) {
		fromLanguage.value = oldVal
	}

	toText.value = await translateText(toText.value, oldVal, newVal)
})

const layout = ref('horizontal')

const changeLayout = () => {
	layout.value = layout.value === 'horizontal' ? 'vertical' : 'horizontal'
}

const loaded = ref(false)

onMounted(async () => {
	loaded.value = true
})
</script>
<template>
	<div
		v-if="loaded"
		class="flex h-full"
		:class="{ 'flex-col lg:flex-row': layout === 'horizontal', 'flex-col lg:flex-col': layout === 'vertical' }"
	>
		<div class="flex h-full flex-1 flex-col space-y-5 bg-gray-500 p-5">
			<div class="flex items-center space-x-3">
				<div class="flex-1">
					<UIFormGroup>
						<UIFormLabel
							for="fromLanguage"
							class="hidden"
						>
							From
						</UIFormLabel>
						<UIFormSelect
							id="fromLanguage"
							v-model="fromLanguage"
							:items="languages"
						/>
					</UIFormGroup>
				</div>
				<UIButton
					v-tippy="{ content: 'Swap Language', animation: 'perspective' }"
					icon
					color="white"
					@click="swapLanguages"
				>
					<UIIcon :icon="ArrowsRightLeftIcon" />
				</UIButton>
				<!-- <UIButton
					v-tippy="{ content: 'Change Layout', animation: 'perspective' }"
					icon
					color="white"
					class="hidden lg:flex"
					:class="{ 'rotate-90': layout === 'vertical' }"
					@click="changeLayout"
				>
					<UIIcon :icon="Bars2Icon" />
				</UIButton> -->
			</div>
			<div class="flex grow">
				<UIFormLabel
					for="fromText"
					class="hidden"
				>
					Text to translate
				</UIFormLabel>
				<UIFormTextarea
					id="fromText"
					v-model="fromText"
					class="grow"
					placeholder="Text to translate"
					@input="updateText"
				/>
			</div>
		</div>
		<div class="flex h-full flex-1 flex-col space-y-5 p-5">
			<div class="flex items-center space-x-3">
				<div class="flex-1">
					<UIFormGroup>
						<UIFormLabel
							for="toLanguage"
							class="hidden"
						>
							To
						</UIFormLabel>
						<UIFormSelect
							id="toLanguage"
							v-model="toLanguage"
							:items="languages"
						/>
					</UIFormGroup>
				</div>
			</div>
			<div class="flex grow rounded-md p-3 shadow-md">
				<div class="selection:bg-secondary">
					{{ toText }}
				</div>
			</div>
		</div>
	</div>
</template>
