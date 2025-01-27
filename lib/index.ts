export const isProd: boolean = process.env.NEXT_PUBLIC_IS_PROD === 'production'

export const STRIPE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!

export const GOOGLE_API_KEY =
	process.env.NEXT_PUBLIC_GOOGLE_LOCATION_PLACE_KEY ?? ''
