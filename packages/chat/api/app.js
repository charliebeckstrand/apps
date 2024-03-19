import express from 'express'
import { OpenAI } from 'openai'
import cors from 'cors'

// Exit if OPENAI_API_KEY isn't set
if (!process.env.OPENAI_API_KEY) {
	console.error('Missing OPENAI_API_KEY environment variable')
	process.exit(1)
}

const app = express()
const port = 4000
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) // OpenAI initialization
const conversations = {} // In-memory storage for conversation histories

app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000' })) // Middleware setup

// OpenAI API call as an async function
const callOpenAI = async (model, userMessage, systemMessage = 'You are a helpful assistant.') =>
	await openai.chat.completions.create({
		model: model || 'gpt-3.5-turbo',
		messages: [
			{ role: 'system', content: systemMessage },
			{ role: 'user', content: userMessage }
		]
	})

// Routes for chat and generating conversation name
app.post('/chat', async (req, res) => {
	try {
		const { message: userMessage, conversationId = 'default' } = req.body
		const systemMessage = 'You are a helpful assistant.'
		const messages = conversations[conversationId] || [{ role: 'system', content: systemMessage }]
		messages.push({ role: 'user', content: userMessage })
		const response = await callOpenAI(null, userMessage, systemMessage)
		messages.push({ role: 'assistant', content: response.choices[0].message.content })
		conversations[conversationId] = messages // Update the stored conversation
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
			'You are a helpful assistant. You provide a concise name for a conversation based on user input.'
		)
		res.json({ conversationName: completion.choices[0].message.content })
	} catch (error) {
		console.error('Error in /generate-name:', error)
		res.status(500).send('Error processing request')
	}
})

// Server initiation
app.listen(port, () => console.log(`Server listening at http://localhost:${port}`))
