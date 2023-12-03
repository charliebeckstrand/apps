<script setup>
const randomName = 'John Doe'
const randomEmail = 'john.doe@email.com'

const user = reactive({ name: randomName, email: randomEmail })

function login() {
	user.id = 1
}
</script>

<template>
	<div class="flex items-center justify-between p-5">
		<!-- <Logo /> -->

		<div class="ml-auto flex items-center">
			<UIButton
				v-if="!user.id"
				color="secondary"
				@click="login"
			>
				<template #prepend>
					<Icon
						icon="ArrowDownLeftIcon"
						size="sm"
					/>
				</template>
				<span>Login</span>
			</UIButton>
			<UIButton
				v-else
				class="text-white"
			>
				<div class="text-right">
					<div class="font-black leading-none">{{ randomName }}</div>
					<div class="text-sm text-gray-200">
						{{ randomEmail }}
					</div>
				</div>
				<template #append>
					<Icon icon="ChevronDownIcon" />
				</template>
			</UIButton>
		</div>
	</div>
</template>

<style scoped>
.header {
	min-height: 94px;
}
</style>
