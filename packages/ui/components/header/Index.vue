<script setup lang="ts">
import Heading from '@/components/heading/Index.vue'

import type { TextSize } from '@/types/base/text-size'
import type { FontWeight } from '@/types/base/font-weight'

interface Props {
	subtitleSize?: TextSize
	subtitleWeight?: FontWeight
	titleSize?: TextSize
	titleWeight?: FontWeight
}

const props = withDefaults(defineProps<Props>(), {
	subtitleSize: 'md',
	subtitleWeight: 'normal',
	titleSize: 'lg',
	titleWeight: 'bold'
})
</script>

<template>
	<div class="flex items-center">
		<div
			v-if="$slots['prepend']"
			class="mr-4 empty:mr-0"
		>
			<slot name="prepend" />
		</div>

		<div>
			<div class="line-clamp-1">
				<Heading
					:size="props.titleSize"
					:weight="props.titleWeight"
				>
					<slot name="title" />
				</Heading>
			</div>
			<div
				v-if="$slots['subtitle']"
				class="line-clamp-1 text-gray-500"
			>
				<Heading
					:size="props.subtitleSize"
					:weight="props.subtitleWeight"
				>
					<slot name="subtitle" />
				</Heading>
			</div>

			<slot name="default" />
		</div>

		<div
			v-if="$slots['append']"
			class="ml-auto empty:ml-0"
		>
			<slot name="append" />
		</div>
	</div>
</template>
