import { supabase } from '@/lib/supabase'

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { city, citations, events } = req.body

		if (!city) {
			return res.status(400).json({ error: 'City is required' })
		}
		if (!citations) {
			return res.status(400).json({ error: 'Citations is required' })
		}
		if (!events) {
			return res.status(400).json({ error: 'Events is required' })
		}

		const { data, error } = await supabase.from('ppxl-events').insert({ city, citations, events }).select().single()

		if (error) {
			return res.status(500).json({ error: error.message })
		}

		return res.status(201).json(data)
	}

	return res.status(405).json({ error: 'Method not allowed' })
}
