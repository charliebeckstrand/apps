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

const callOpenAI = async (
	model,
	userMessage,
	conversationHistory = [],
	systemMessage = 'You are a helpful assistant.'
) => {
	const messages = [
		{ role: 'system', content: systemMessage },
		...conversationHistory,
		{ role: 'user', content: userMessage }
	]
	return await openai.chat.completions.create({
		model: model || 'gpt-3.5-turbo',
		messages
	})
}

const conversations = new Map() // Store conversation history

app.post('/chat', async (req, res) => {
	try {
		const { message: userMessage, conversationId } = req.body
		const conversationHistory = conversations.get(conversationId) || []
		const response = await callOpenAI(null, userMessage, conversationHistory)
		const reply = response.choices[0].message.content

		// Update conversation history
		conversationHistory.push({ role: 'user', content: userMessage })
		conversationHistory.push({ role: 'assistant', content: reply })
		conversations.set(conversationId, conversationHistory)

		res.json({ reply })
	} catch (error) {
		console.error('Error in /chat:', error)
		res.status(500).send('Error processing request')
	}
})

app.post('/generate-name', async (req, res) => {
	try {
		const { message: userMessage, conversationId } = req.body
		const conversationHistory = conversations.get(conversationId) || []
		const completion = await callOpenAI(
			null,
			userMessage,
			conversationHistory,
			'You are a helpful assistant. You provide a concise name for a conversation based on a user input, using 2 to 4 words. For example, if the user input is "Write a JavaScript function," you could respond with "JavaScript Code Snippet." If you are unable to generate a name, try using a summary of the user input. The result should never be longer than 10 words and should usually be shorter.'
		)
		const conversationName = completion.choices[0].message.content.trim()

		// Optionally, update conversation history
		conversationHistory.push({ role: 'user', content: userMessage })
		conversationHistory.push({ role: 'assistant', content: conversationName })
		conversations.set(conversationId, conversationHistory)

		res.json({ conversationName })
	} catch (error) {
		console.error('Error in /generate-name:', error)
		res.status(500).send('Error processing request')
	}
})

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`))
