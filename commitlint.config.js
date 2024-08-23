const config = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'revert']],
		'type-case': [2, 'always', 'lower-case'],
		'type-empty': [2, 'never']
	}
}

export default config
