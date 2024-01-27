<script setup lang="ts"></script>

<template>
	<UIButton rounded="full">
		<template #prepend>
			<slot name="prepend" />
		</template>
		<slot />

		<template #append>
			<slot name="append" />
		</template>
	</UIButton>
</template>

<style scoped lang="scss"></style>
