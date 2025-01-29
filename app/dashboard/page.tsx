import { getUser } from '@/queries/user'
import LogoutButton from './LogoutButton'

export default async function Dashboard() {
	const user = await getUser()

	console.log('--------------------------------')
	console.log('user: ', user)
	console.log('--------------------------------')

	return (
		<main>
			<div>Dashboard</div>
			<p>Hello {user?.email}</p>

			<LogoutButton />
		</main>
	)
}
