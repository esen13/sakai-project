export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const { message } = req.body

			const options = {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${process.env.PPXL_KEY}`,
					'Content-Type': 'application/json'
				},
				body: `{"model":"sonar","messages":[{"role":"system","content":"You are an assistant that helps the user find zip codes in cities and provide the corresponding neighborhood or area name most commonly associated with each ZIP code. If a ZIP code covers multiple neighborhoods, list the most prominent or well-known one. Format the results as a list with each ZIP code followed by its primary neighborhood name. Always return responses strictly in JSON format with the following keys: zip_code, neighborhoods. Ensure all responses are structured as a list of JSON objects. If data is insufficient, use available information but maintain the specified structure."},{"role":"user","content":"${message}"}]}`
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
