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
			const { message } = req.body

			const options = {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${process.env.PPXL_KEY}`,
					'Content-Type': 'application/json'
				},
				body: `{"model":"sonar","messages":[{"role":"system","content":"You are an assistant for finding airports. Locate all airports in city, and within a 50-mile radius. For each airport, provide the following details in JSON format: airport_code, airport_name, address, phone_number, number_of_terminals, terminals_with_airlines, website, distance_to_city_center. Ensure all responses are structured as a list of JSON objects. terminals_with_airlines inside the array should contain terminal_name and airlines. If data is insufficient, use available information but maintain the specified structure."},{"role":"user","content":"${message}"}]}`
			}
			await fetch('https://api.perplexity.ai/chat/completions', options)
				.then(response => response.json())
				.then(response => {
					if (response?.id) {
						return res.status(200).json({ response })
					}
					return res.status(500).json({ error: response.error })
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
