import OpenAI from 'openai'

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const { message } = req.body

			const response = await openai.chat.completions.create({
				model: 'gpt-4',
				messages: [
					{
						role: 'system',
						content:
							'You are a helpful assistant that outputs data in JSON format.'
					},
					{ role: 'user', content: message }
				]
			})

			// response.choices[0].message.content
			res.status(200).json({ reply: response })
		} catch (error) {
			res.status(500).json({ error: error || 'Unknown error' })
		}
	}
	res.status(405).end(`Метод not allowed`)
}
