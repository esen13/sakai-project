import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import LogoutButton from './LogoutButton'

export default async function Dashboard() {
	const supabase = await createClient()
	const { data, error } = await supabase.auth.getUser()
	if (error || !data?.user) {
		redirect('/login')
	}

	console.log('data: ', data)

	return (
		<>
			<div>Dashboard</div>
			<p>Hello {data.user.email}</p>

			<LogoutButton />
		</>
	)
}
