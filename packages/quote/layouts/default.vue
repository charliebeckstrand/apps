<template>
	<div>
		<UIBanner
			color="danger"
			padding="none"
		>
			<div class="container mx-auto max-w-[1080px] p-4">
				<UIHeading>test</UIHeading>
			</div>
		</UIBanner>
		<div class="container mx-auto max-w-[1080px] p-4">
			<div class="flex space-x-4">
				<div class="border-l-primary flex-1 border border-l-2 p-4">
					<slot />
				</div>

				<div></div>
			</div>
		</div>
	</div>
</template>
