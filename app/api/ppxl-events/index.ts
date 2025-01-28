import axios from 'axios'

const SCHEMA = {
	genre: { type: 'string' },
	image: { type: 'string' },
	url: { type: 'string' },
	date: { type: 'string' },
	time: { type: 'string' },
	location: { type: 'string' },
	name: { type: 'string' },
	description: { type: 'string' },
	price: { type: 'string' }
}

export default async function handler(
	req: { method: string; body: { message: any } },
	res: {
		status: (arg0: number) => {
			(): any
			new (): any
			json: { (arg0: { response?: any; error?: any }): any; new (): any }
		}
	}
) {
	if (req.method === 'POST') {
		try {
			const url = process.env.PPXL_URL || ''
			const headers = {
				Authorization: `Bearer ${process.env.PPXL_KEY}`,
				'Content-Type': 'application/json'
			}

			const { message } = req.body

			// `"messages": [{"role":"system","content":"You are a helpful assistant that outputs data in JSON format."},{"role":"user","content": "${message}"}],"return_images":"true","model": "sonar"`

			const payload = {
				model: 'sonar',
				messages: [
					{
						role: 'system',
						content:
							'You are an assistant that helps the user find events in cities across the USA. Use data from Eventbrite.com. Be precise and concise.'
					},
					{
						role: 'user',
						content: `${message}. Please output a JSON object containing the following fields: genre, image, url, date, time, location, name, description, price.`
					}
				],
				response_format: {
					type: 'json_schema',
					json_schema: {
						schema: {
							type: 'object',
							properties: SCHEMA,
							required: Object.keys(SCHEMA)
						}
					}
				}
			}

			// 	const options = {
			// 		method: 'POST',
			// 		headers: { Authorization: `Bearer ${process.env.PPXL_KEY}`, 'Content-Type': 'application/json' },
			// 		body: `{"model":"sonar","messages":[{"role":"system","content":"You are an assistant that helps the user find events in cities across the USA. Use data from Eventbrite.com. Also check the genre, it should always contain one word. Always return responses strictly in JSON format with the following keys: name, date, time, location, genre, category, description, price, image, url or source: the link to an image of the event. Ensure all responses are structured as a list of JSON objects. If data is insufficient, use available information but maintain the specified structure."},{"role":"user","content":"${message}"}],"response_format":{"type":"json_schema","json_schema":{"schema": AnswerFormat.model_json_schema()},
			// }}`
			// 	}
			await axios
				.post(url, payload, { headers })
				.then(response => {
					if (response?.data?.id) {
						return res.status(200).json({ response: response.data })
					}
					return res.status(500).json({ error: response.data.error })
				})
				.catch((err: Error) => res.status(500).json({ error: err.message }))
		} catch (error: unknown) {
			if (error instanceof Error) {
				return res.status(500).json({ error: error.message })
			}
			return res.status(500).json({ error: 'An unknown error occurred' })
		}
	}
	return res.status(405).json({ error: 'Method not allowed' })
}
