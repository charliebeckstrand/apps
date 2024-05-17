<script setup lang="ts">
import { useOrientation } from '@/composables/form/useOrientation'
import { useTailwindClasses } from '@/composables/useTailwindClasses'
import { useValidation } from '@/composables/form/useValidation'

import type { Orientation } from '@/types/base/orientation'

type Props = {
	orientation?: Orientation
	validation?: any
}

const props = withDefaults(defineProps<Props>(), {
	orientation: 'vertical',
	validation: undefined
})

const { orientation, validation } = toRefs(props)
</script>

<template>
	<div>
		<div :class="['ui-form-group', useTailwindClasses([useOrientation(orientation), useValidation(validation)])]">
			<slot />
		</div>
		<div
			v-for="error in validation?.$errors"
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
