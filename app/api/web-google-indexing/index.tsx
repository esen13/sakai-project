import { callIndexingAPI } from '@/lib/indexingApi'

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { urls, type, fileData } = req.body

		if (!urls || !Array.isArray(urls) || urls.length === 0) {
			return res.status(400).json({ error: 'An array of URLs and type are required.' })
		}

		if (!fileData || fileData.length === 0) {
			return res.status(400).json({ error: 'File not be empty' })
		}

		try {
			const results = await Promise.all(
				urls.map(async url => {
					try {
						const response = await callIndexingAPI(url, type, fileData)
						return { url, status: 'success', data: response }
					} catch (error) {
						return { url, status: 'error', error: error.message }
					}
				})
			)

			return res.status(200).json({ message: 'Batch processing completed.', results })
		} catch (error) {
			return res.status(500).json({ error: error.message })
		}
	}

	return res.status(405).json({ error: 'Method not allowed.' })
}
