import { getUser } from '@/queries/user'
import { redirect } from 'next/navigation'
import { Login } from '../login-page'

export default async function SignUpPage() {
	const user = await getUser()
	console.log('SignUpPage user', user)
	if (user) {
		return redirect('/')
	}

	return <Login mode="signup" />
}
