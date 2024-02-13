<script setup lang="ts">
import type { Orientation } from '@/types/base/orientation'

type Props = {
	orientation?: Orientation
	validation?: any
}

const props = withDefaults(defineProps<Props>(), {
	orientation: 'vertical',
	validation: undefined
})

const classes = computed(() => {
	const orientationMap: Record<Orientation, string> = {
		horizontal: 'flex items-center flex-row horizontal',
		vertical: 'flex flex-col vertical'
	}

	const validationMap: Record<string, string> = {
		invalid: 'invalid',
		valid: 'valid'
	}

	const classes = ['ui-form-group']

	if (props.orientation) {
		classes.push(orientationMap[props.orientation])
	}

	if (props.validation) {
		if (props.validation?.$errors.length) {
			classes.push(validationMap.invalid)
		} else {
			classes.push(validationMap.valid)
		}
	}

	return classes.join(' ')
})
</script>

<template>
	<div>
		<div :class="classes">
			<slot />
		</div>
		<div
			v-for="error in props.validation?.$errors"
			:key="error.$uid"
			class="text-danger"
		>
			{{ error.$message }}
		</div>
	</div>
</template>

<style scoped lang="scss">
.ui-form-group {
	&.invalid {
		:deep(input, textarea, select) {
			@apply border-danger focus:border-danger text-danger;
		}
	}
	&.horizontal {
		:deep(> *:not(.hidden)) {
			& + * {
				@apply ml-1;
			}
		}
	}

	&.vertical {
		:deep(> *:not(.hidden)) {
			& + * {
				@apply mt-1;
			}
		}
	}
}
</style>
