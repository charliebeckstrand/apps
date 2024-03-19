<template>
	<div class="h-full">
		<UINavbar color="primary">
			<template #right>
				<UIButton
					color="accent"
					text-color="default"
					rounded="full"
				>
					Get Quote
				</UIButton>
			</template>
		</UINavbar>
		<slot />
	</div>
</template>
