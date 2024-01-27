<script setup lang="ts">
import { TransitionChild } from '@headlessui/vue'
</script>

<template>
	<TransitionChild
		as="template"
		enter="transition-opacity ease-linear duration-300"
		enter-from="opacity-0"
		enter-to="opacity-100"
		leave="transition-opacity ease-linear duration-300"
		leave-from="opacity-100"
		leave-to="opacity-0"
	>
		<div class="fixed inset-0 z-30 bg-gray-900/80" />
	</TransitionChild>
</template>
