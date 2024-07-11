import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import path from 'path'

import { OpenAI } from 'openai'

dotenv.config({ path: path.resolve(process.cwd(), '../.env') })

if (!process.env.OPENAI_API_KEY) {
	console.error('Missing OPENAI_API_KEY environment variable')
	process.exit(1)
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const app = express()
const port = 4000

app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000' }))

const callOpenAI = async (model, userMessage, systemMessage = 'You are a helpful assistant.') =>
	await openai.chat.completions.create({
		model: model || 'gpt-3.5-turbo',
		messages: [
			{ role: 'system', content: systemMessage },
			{ role: 'user', content: userMessage }
		]
	})

app.post('/chat', async (req, res) => {
	try {
		const { message: userMessage } = req.body
		messages.push({ role: 'user', content: userMessage })
		const response = await callOpenAI(null, userMessage, (systemMessage = 'You are a helpful assistant.'))
		messages.push({ role: 'assistant', content: response.choices[0].message.content })
		res.json({ reply: response.choices[0].message.content })
	} catch (error) {
		console.error('Error in /chat:', error)
		res.status(500).send('Error processing request')
	}
})

app.post('/generate-name', async (req, res) => {
	try {
		const { message: userMessage } = req.body
		const completion = await callOpenAI(
			null,
			userMessage,
			'You are a helpful assistant. You provide a concise name for a conversation based on user input. The name should be descriptive and engaging but not overly long.'
		)
		res.json({ conversationName: completion.choices[0].message.content })
	} catch (error) {
		console.error('Error in /generate-name:', error)
		res.status(500).send('Error processing request')
	}
})

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`))
