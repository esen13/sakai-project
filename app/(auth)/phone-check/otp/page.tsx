import { getUser } from '@/queries/user'
import { redirect } from 'next/navigation'
import Form from './form'

export default async function Page() {
	const user = await getUser()
	if (user) {
		redirect('/dashboard')
	}

	return <Form />
}
