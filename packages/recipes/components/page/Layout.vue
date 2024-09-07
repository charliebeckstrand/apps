<template>
	<div class="page">
		<div
			v-if="$slots.breadcrumbs"
			class="breadcrumbs p-4"
		>
			<slot name="breadcrumbs" />
		</div>

		<div
			v-if="$slots.header"
			class="header p-4"
		>
			<slot name="header" />
		</div>

		<div
			v-if="$slots.default"
			class="content space-y-4 p-4"
		>
			<slot />
		</div>

		<div
			v-if="$slots.footer"
			class="footer flex items-center space-x-2 p-4"
		>
			<slot name="footer" />
		</div>
	</div>
</template>

<style scoped lang="scss">
.page {
	.breadcrumbs + .header,
	.header + .content,
	.content + .footer {
		@apply -mt-4;
	}
}
</style>
