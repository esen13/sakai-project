export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const { message } = req.body

			// `"messages": [{"role":"system","content":"You are a helpful assistant that outputs data in JSON format."},{"role":"user","content": "${message}"}],"return_images":"true","model": "llama-3.1-sonar-small-128k-online"`

			// "You are a helpful assistant that outputs data in JSON format with fields name, date, location, description, price, image, url or source."

			const options = {
				method: 'POST',
				headers: { Authorization: `Bearer ${process.env.PPXL_KEY}`, 'Content-Type': 'application/json' },
				body: `{"model":"llama-3.1-sonar-small-128k-online","messages":[{"role":"system","content":"You are an assistant that helps the user find events in cities across the USA. Use data from Eventbrite.com. Also check the genre, it should always contain one word. Always return responses strictly in JSON format with the following keys: name, date, time, location, genre, category, description, price, image, url or source: the link to an image of the event. Ensure all responses are structured as a list of JSON objects. If data is insufficient, use available information but maintain the specified structure."},{"role":"user","content":"${message}"}]}`
			}
			await fetch('https://api.perplexity.ai/chat/completions', options)
				.then(response => response.json())
				.then(response => {
					if (response?.id) {
						return res.status(200).json({ response })
					}
					return res.status(500).json({ error: response.error })
				})
				.catch(err => res.status(500).json({ error: err.message }))
		} catch (error) {
			return res.status(500).json({ error: error.message })
		}
	}
	return res.status(405).json({ error: 'Method not allowed' })
}
