import { z } from 'zod'

export const phoneSchema = z
	.string()
	.min(10, 'Phone number must be at least 10 characters')

export const otpSchema = z.string().min(6, 'OTP must be 6 digits')
