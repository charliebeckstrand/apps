<script setup lang="ts"></script>

<template>
	<header class="flex items-center">
		<div
			v-if="$slots['prepend']"
			class="mr-3 empty:mr-0"
		>
			<slot name="prepend" />
		</div>

		<div>
			<div class="line-clamp-1 text-lg font-bold leading-tight">
				<slot name="title" />
			</div>
			<div
				v-if="$slots['subtitle']"
				class="line-clamp-1 font-normal leading-tight text-gray-500"
			>
				<slot name="subtitle" />
			</div>

			<slot />
		</div>

		<div
			v-if="$slots['append']"
			class="ml-auto empty:ml-0"
		>
			<slot name="append" />
		</div>
	</header>
</template>

<style scoped lang="scss"></style>
