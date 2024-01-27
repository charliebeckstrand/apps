<script setup lang="ts">
import { ArrowPathIcon } from '@heroicons/vue/24/outline'

import type { Card } from '@/types/card'

const props = withDefaults(
	defineProps<{
		card: Card
		inactive?: boolean
		selected?: boolean
	}>(),
	{
		inactive: false,
		selected: false
	}
)

const emit = defineEmits(['esc'])

const cardFacedHaveImages = computed<boolean>(() => {
	if (props.card.card_faces && props.card.card_faces.length) {
		return props.card.card_faces.every((face) => face.image_uris)
	}

	return false
})

const visibleSide = ref('front')

const toggleVisibleSide = () => {
	if (visibleSide.value === 'front') visibleSide.value = 'back'
	else visibleSide.value = 'front'
}

onMounted(() => {})
</script>

<template>
	<div
		:ref="`card-${card.id}`"
		:id="`card-${card.id}`"
		class="relative"
		:class="{
			'opacity-20 grayscale hover:opacity-100 hover:grayscale-0': props.inactive,
			'grayscale-0 hover:grayscale-0': props.selected
		}"
	>
		<template v-if="props.card.card_faces && props.card.card_faces.length">
			<template v-for="(face, index) in props.card.card_faces">
				<img
					v-if="face.image_uris"
					:src="face.image_uris.border_crop"
					draggable="false"
					:class="{
						hidden: (index === 0 && visibleSide === 'back') || (index === 1 && visibleSide === 'front')
					}"
				/>
			</template>
			<UIButton
				v-if="cardFacedHaveImages"
				icon
				variant="default"
				color="primary"
				size="sm"
				class="absolute top-12 text-white transition-all duration-300"
				:class="{
					'rotate-180': visibleSide === 'back',
					'right-5': card.frame_effects && card.frame_effects.includes('extendedart'),
					'right-6': !card.frame_effects || !card.frame_effects.includes('extendedart')
				}"
				@click.stop="toggleVisibleSide"
			>
				<UIIcon :icon="ArrowPathIcon" />
			</UIButton>
		</template>
		<template v-if="props.card.image_uris">
			<img
				:src="props.card.image_uris.border_crop"
				draggable="false"
			/>
		</template>

		<!-- <pre v-if="card.digital">{{ card }}</pre> -->
	</div>
</template>

<style scoped></style>
