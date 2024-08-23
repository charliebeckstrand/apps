import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt(
	{
		root: true,
		...eslint.configs.recommended,
		...tseslint.configs.recommendedTypeChecked,
		...tseslint.configs.stylisticTypeChecked,
		...tseslint.configs.recommended
	},
	{
		rules: {
			'@typescript-eslint/consistent-type-imports': 'off',
			'@typescript-eslint/no-explicit-any': ['off'],
			'@typescript-eslint/no-use-before-define': 'error',
			'vue/no-v-html': 'off',
			'vue/no-multiple-template-root': 'off',
			'vue/html-self-closing': 'off',
			'vue/singleline-html-element-content-newline': 'off',
			'vue/multi-word-component-names': 'off',
			'vue/no-spaces-around-equal-signs-in-attribute': ['error'],
			'vue/html-closing-bracket-newline': ['off'],
			'vue/first-attribute-linebreak': [
				'error',
				{
					singleline: 'ignore',
					multiline: 'below'
				}
			]
		}
	}
)
