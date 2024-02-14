<script setup lang="ts">
type Color = 'accent' | 'white'

interface Props {
	color?: Color
	sticky?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	color: 'white',
	sticky: false
})

const classes = computed<string>(() => {
	const colorMap = {
		accent: 'bg-accent/5 border-accent/10',
		white: 'bg-white'
	}

	const classes = ['flex items-center p-4']

	if (props.color) {
		const color = colorMap[props.color]

		if (color) {
			classes.push(color)
		}
	}

	if (props.sticky) {
		classes.push('sticky top-0 z-20')
	}

	return classes.join(' ')
})
</script>

<template>
	<div :class="classes">
		<div
			v-if="$slots['prepend']"
			class="prepend mr-5 flex items-center empty:mr-0"
		>
			<slot name="prepend" />
		</div>

		<div class="flex-grow space-y-4">
			<div class="space-y-2">
				<h2 class="line-clamp-1 items-center text-2xl font-black leading-tight">
					<slot name="title" />
				</h2>
				<h3
					v-if="$slots['subtitle']"
					class="leading-tight text-gray-500"
				>
					<slot name="subtitle" />
				</h3>
			</div>
			<div
				v-if="$slots['misc']"
				class="misc flex items-center"
			>
				<slot name="misc" />
			</div>
		</div>

		<div
			v-if="$slots['append']"
			class="append ml-5 flex items-center empty:ml-0"
		>
			<slot name="append" />
		</div>
	</div>
</template>
