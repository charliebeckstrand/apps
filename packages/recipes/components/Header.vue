<script setup lang="ts"></script>

<template>
	<div>
		<UIHeader>
			<template #prepend>
				<slot name="prepend" />
			</template>

			<template #title>
				<UIHeading
					size="2xl"
					weight="bold"
				>
					<slot name="title" />
				</UIHeading>
			</template>

			<template #subtitle>
				<slot name="subtitle" />
			</template>

			<template #default>
				<slot name="default" />
			</template>

			<template #append>
				<slot name="append" />
			</template>
		</UIHeader>
	</div>
</template>

<style scoped lang="scss"></style>
