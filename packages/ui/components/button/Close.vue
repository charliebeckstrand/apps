<script setup lang="ts">
import Button from '@/components/button/Index.vue'
import Icon from '@/components/icon/Index.vue'

import { XMarkIcon } from '@heroicons/vue/24/outline'
</script>

<template>
	<Button aria-label="Close">
		<Icon :icon="XMarkIcon" />
	</Button>
</template>
