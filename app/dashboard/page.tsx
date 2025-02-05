import { getUser, getUserRole, getUserSubscription } from '@/queries/user'
import LogoutButton from './LogoutButton'

export default async function Dashboard() {
	const user = await getUser()
	const role = await getUserRole(user?.id || '')
	const subscription = await getUserSubscription(user?.id || '')

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
				{role && (
					<p className="text-sm">
						Your role is <span className="font-bold">{role}</span>
					</p>
				)}
				<p className="text-sm">
					Your email is active:{' '}
					{user?.user_metadata.email_verified ? 'Yes' : 'No'}
				</p>

				{subscription && (
					<>
						<p className="text-sm">
							Your subscription is status: {subscription?.status.toUpperCase()}
						</p>
						<p className="text-sm">
							Your subscription is plan: {subscription?.plan.toUpperCase()}
						</p>
					</>
				)}
			</div>

			<LogoutButton className="mt-4" />
		</main>
	)
}
