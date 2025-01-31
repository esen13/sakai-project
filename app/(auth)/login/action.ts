'use server'

import { z } from 'zod'

import { createClient } from '@/utils/supabase/server'

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6)
})

export const loginUser = async ({
	email,
	password
}: {
	email: string
	password: string
}) => {
	const loginUserValidation = loginSchema.safeParse({
		email,
		password
	})

	if (!loginUserValidation.success) {
		return {
			error: true,
			message:
				loginUserValidation.error.issues[0]?.message ?? 'An error occurred'
		}
	}

	const supabase = await createClient()
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password
	})

	if (error) {
		return {
			error: true,
			message: error.message
		}
	}

	if (!data.user) {
		return {
			error: true,
			message: 'Login failed. Please try again.'
		}
	}

	return {
		success: true,
		message: 'Signed in successfully',
		user: {
			id: data.user.id,
			email: data.user.email
		}
	}
}
