<script setup lang="ts"></script>

<template>
	<div class="bg-primary flex h-full w-[16rem] min-w-[16rem] flex-col">
		<slot name="prepend" />

		<div class="flex grow overflow-hidden pb-3">
			<div class="grow overflow-y-auto px-3">
				<slot />
			</div>
		</div>

		<slot name="append" />
	</div>
</template>
