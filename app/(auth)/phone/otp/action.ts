'use server'

import { createClient } from '@/utils/supabase/server'

export const otpCheck = async ({
	phone,
	otp
}: {
	phone: string
	otp: string
}) => {
	const supabase = await createClient()
	const { data, error } = await supabase.auth.verifyOtp({
		token: otp,
		type: 'sms',
		phone
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
			message: 'OTP not verified. Please try again.'
		}
	}

	return {
		success: true,
		message: 'OTP verified successfully',
		user: {
			...data.user
		}
	}
}
