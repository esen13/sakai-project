import { supabase } from '@/lib/supabase/client'

export default async function handler(req, res) {
	if (req.method === 'GET') {
		const { city } = req.query

		if (!city) {
			return res.status(400).json({ error: 'City is required' })
		}

		const { data, error } = await supabase
			.from('ppxl-events')
			.select('*')
			.eq('city', city)

		if (error) {
			return res.status(500).json({ error: error.message })
		}

		return res.status(200).json(data)
	}

	return res.status(405).json({ error: 'Method not allowed' })
}
