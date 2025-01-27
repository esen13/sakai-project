import { supabase } from '@/lib/supabase'

export default async function handler(req, res) {
	if (req.method === 'GET') {
		const { airportName } = req.query

		if (!airportName) {
			return res.status(400).json({ error: 'Airport Name is required' })
		}

		const { data, error } = await supabase.from('ppxl-airports-with-county').select('*').eq('airportName', airportName)

		if (error) {
			return res.status(500).json({ error: error.message })
		}

		return res.status(200).json(data)
	}

	return res.status(405).json({ error: 'Method not allowed' })
}
