module.exports = {
	apps: [
		{
			name: 'chat',
			script: 'yarn',
			args: 'start',
			cwd: './packages/chat',
			env: {
				NODE_ENV: 'production',
				PORT: 3001
			}
		},
		{
			name: 'recipes',
			script: 'yarn',
			args: 'start',
			cwd: './packages/recipes',
			env: {
				NODE_ENV: 'production',
				PORT: 3002
			}
		},
		{
			name: 'translate',
			script: 'yarn',
			args: 'start',
			cwd: './packages/translate',
			env: {
				NODE_ENV: 'production',
				PORT: 3003
			}
		}
	]
}
