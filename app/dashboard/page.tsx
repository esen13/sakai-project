import { getUser } from '@/queries/user'
import LogoutButton from './LogoutButton'

export default async function Dashboard() {
	const user = await getUser()

	console.log('--------------------------------')
	console.log('user: ', user)
	console.log('--------------------------------')

	return (
		<main className="px-20 py-10">
			<div className="flex flex-col gap-4">
				<h1 className="text-2xl font-bold">Dashboard</h1>
				<p className="text-lg">Hello, {user?.email}</p>
				{user?.phone && (
					<p className="text-sm">Your phone number is {user?.phone}</p>
				)}
			</div>

			<LogoutButton className="mt-4" />
		</main>
	)
}
