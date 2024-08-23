const config = {
	'**/*.{vue,ts}': ['eslint --cache --no-ignore --fix --max-warnings=0', 'prettier --write'],
	'**/*.{js,json}': ['prettier --write']
}

export default config
