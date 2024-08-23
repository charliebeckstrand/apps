const config = {
	'./package.json': ['scriptlint --fix'],
	'**/*.{js,json}': ['prettier --write'],
	'**/*.{vue,ts}': ['eslint --cache --no-ignore --fix --max-warnings=0', 'prettier --write'],
	'packages/**/package.json': ['scriptlint --fix']
}

export default config
