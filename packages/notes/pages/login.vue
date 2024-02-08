<script setup lang="ts">
import { LockClosedIcon } from '@heroicons/vue/24/outline'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
</script>
<template>
	<div class="flex h-full">
		<div class="m-auto space-y-5 sm:min-w-[320px]">
			<div class="flex">
				<nuxt-link
					to="/"
					tabindex="-1"
					class="mx-auto flex transition-transform duration-300 ease-in-out hover:-rotate-6"
				>
					<img
						src="/sticky-note.png"
						class="block h-20 w-20"
					/>
				</nuxt-link>
			</div>

			<div class="space-y-2">
				<UIFormGroup>
					<UIFormLabel
						for="email"
						class="sr-only"
					>
						Email
					</UIFormLabel>
					<UIFormInput
						id="email"
						type="email"
						v-model="email"
						label="Email"
						placeholder="Email"
					/>
				</UIFormGroup>
				<UIFormGroup>
					<UIFormLabel
						for="password"
						class="sr-only"
					>
						Password
					</UIFormLabel>
					<UIFormPassword
						id="password"
						type="password"
						v-model="password"
						label="Password"
						placeholder="Password"
					/>
				</UIFormGroup>
			</div>

			<div class="flex items-center">
				<UIFormGroup>
					<UIFormLabel
						for="remember-me"
						class="sr-only"
					>
						Remember me
					</UIFormLabel>
					<UIFormCheckbox
						id="remember-me"
						v-model="rememberMe"
						size="sm"
					>
						Remember me
					</UIFormCheckbox>
				</UIFormGroup>
			</div>

			<div class="space-y-2">
				<UIButton
					color="primary"
					block
				>
					Login
				</UIButton>
				<!-- <div class="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
					<UIButton
						color="primary"
						variant="text"
						size="sm"
						class="block w-full justify-center"
					>
						Google Login
					</UIButton>
					<UIButton
						color="primary"
						variant="text"
						size="sm"
						class="block w-full justify-center"
					>
						GitHub Login
					</UIButton>
				</div> -->
			</div>
		</div>
	</div>
</template>
