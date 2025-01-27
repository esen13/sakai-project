import { supabase } from '@/lib/supabase'

export default async function handler(req, res) {
	if (req.method === 'DELETE') {
		const { airportName } = req.body

		if (!airportName) {
			return res.status(400).json({ error: 'Airport Name is required' })
		}

		const { error } = await supabase
			.from('ppxl-airports-with-county')
			.delete()
			.eq('airportName', airportName)
			.throwOnError()

		if (error) {
			return res.status(500).json({ error: error.message })
		}

		return res.status(204).json({ message: 'Successfully deleted' })
	}

	return res.status(405).json({ error: 'Method not allowed' })
}
