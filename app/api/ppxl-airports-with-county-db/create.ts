import { supabase } from '@/lib/supabase'

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { city, citations, lists, airportName } = req.body

		if (!city) {
			return res.status(400).json({ error: 'City is required' })
		}
		if (!citations) {
			return res.status(400).json({ error: 'Citations is required' })
		}
		if (!lists) {
			return res.status(400).json({ error: 'Lists is required' })
		}

		if (!airportName) {
			return res.status(400).json({ error: 'Airport Name is required' })
		}

		const { data, error } = await supabase
			.from('ppxl-airports-with-county')
			.insert({ airportName, city, citations, lists })
			.select()
			.single()

		if (error) {
			return res.status(500).json({ error: error.message })
		}

		return res.status(201).json(data)
	}

	return res.status(405).json({ error: 'Method not allowed' })
}
