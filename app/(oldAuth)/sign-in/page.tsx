import { getUser } from '@/queries/user'
import { redirect } from 'next/navigation'
import { Login } from '../login-page'

export default async function SignInPage() {
	const user = await getUser()
	console.log('SignInPage user', user)
	if (user) {
		return redirect('/')
	}

	return <Login mode="signin" />
}
