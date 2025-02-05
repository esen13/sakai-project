'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export const getUser = async () => {
	const supabase = await createClient()
	const {
		data: { user },
		error
	} = await supabase.auth.getUser()
	if (error) {
		return null
	}

	return user
}

export const logout = async () => {
	const supabase = await createClient()
	await supabase.auth.signOut()
	redirect('/login')
}

export const getUserRole = async (userId: string) => {
	if (!userId) return null

	const supabase = await createClient()
	const { data, error } = await supabase
		.from('user_roles')
		.select('role')
		.eq('user_id', userId)

	if (error) {
		console.error('Ошибка получения ролей:', error)
		return null
	}

	return data[0]?.role || 'user'
}

export const getUserSubscription = async (userId: string) => {
	const supabase = await createClient()
	const { data, error } = await supabase
		.from('subscriptions')
		.select() // 'status, plan'
		.eq('user_id', userId)

	if (error) {
		console.error('Ошибка получения статуса подписки:', error)
		return null
	}

	return data[0] || null
}
