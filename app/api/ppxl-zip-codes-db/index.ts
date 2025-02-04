import { supabase } from '@/lib/supabase/client'

export default async function handler(req, res) {
	if (req.method === 'GET') {
		const { data, error } = await supabase
			.from('ppxl-zip-codes')
			.select('*')
			.order('created_at', { ascending: false })

		if (error) {
			return res.status(500).json({ error: error.message })
		}

		return res.status(200).json(data)
	}

	return res.status(405).json({ error: 'Method not allowed' })
}
