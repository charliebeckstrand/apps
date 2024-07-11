module.exports = {
	apps: [
		{
			name: 'chat-app',
			script: 'yarn',
			args: 'start',
			cwd: './packages/chat',
			env: {
				NODE_ENV: 'production',
				PORT: 3001
			}
		},
		{
			name: 'recipes-app',
			script: 'yarn',
			args: 'start',
			cwd: './packages/recipes',
			env: {
				NODE_ENV: 'production',
				PORT: 3002
			}
		},
		{
			name: 'todo-app',
			script: 'yarn',
			args: 'start',
			cwd: './packages/todo',
			env: {
				NODE_ENV: 'production',
				PORT: 3003
			}
		},
		{
			name: 'translate-app',
			script: 'yarn',
			args: 'start',
			cwd: './packages/translate',
			env: {
				NODE_ENV: 'production',
				PORT: 3004
			}
		}
	]
}
