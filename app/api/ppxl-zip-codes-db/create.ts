import { supabase } from '@/lib/supabase'

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { city, citations, zip_codes } = req.body

		if (!city) {
			return res.status(400).json({ error: 'City is required' })
		}
		if (!citations) {
			return res.status(400).json({ error: 'Citations is required' })
		}
		if (!zip_codes) {
			return res.status(400).json({ error: 'Zip codes is required' })
		}

		const { data, error } = await supabase
			.from('ppxl-zip-codes')
			.insert({ city, citations, zip_codes })
			.select()
			.single()

		if (error) {
			return res.status(500).json({ error: error.message })
		}

		return res.status(201).json(data)
	}

	return res.status(405).json({ error: 'Method not allowed' })
}
