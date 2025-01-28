export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const { message } = req.body

			// You are an assistant who helps the user find county and popular city and nearby airports within a 50 mile radius. Always return responses strictly in JSON format with the following keys: county with distance, nearby_airports with link and distance.

			const options = {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${process.env.PPXL_KEY}`,
					'Content-Type': 'application/json'
				},
				body: `{"model":"sonar","messages":[{"role":"system","content":"You are an assistant who helps the user find county and popular city and nearby airports within a 50 mile radius. Always return responses strictly in JSON format with the following keys: county with distance, airport with link and distance. Ensure all responses are structured as a one list of JSON objects. If data is insufficient, use available information but maintain the specified structure."},{"role":"user","content":"${message}"}]}`
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
