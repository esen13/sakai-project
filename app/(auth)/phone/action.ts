'use server'

import { createClient } from '@/utils/supabase/server'

export const phoneCheck = async ({ phone }: { phone: string }) => {
	const supabase = await createClient()
	const { data, error } = await supabase.auth.signInWithOtp({
		phone
	})

	if (error) {
		return {
			error: true,
			message: error.message
		}
	}

	if (!data) {
		return {
			error: true,
			message: 'Phone number not found. Please try again.'
		}
	}

	return {
		success: true,
		message: 'Phone number verified successfully',
		user: {
			...data
		}
	}
}
