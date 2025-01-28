import { getUser } from '@/queries/user'
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	const requestUrl = new URL(request.url)
	const code = requestUrl.searchParams.get('code')
	const encodedRedirectTo = requestUrl.searchParams.get('redirect') || '/'
	const priceId = decodeURIComponent(
		requestUrl.searchParams.get('priceId') || ''
	)
	const discountCode = decodeURIComponent(
		requestUrl.searchParams.get('discountCode') || ''
	)
	const redirectTo = decodeURIComponent(encodedRedirectTo)

	if (code) {
		const supabase = await createClient()
		await supabase.auth.exchangeCodeForSession(code)
		const userData = await getUser()
		console.log('[api callback] userData', userData)

		// await getOrCreateUserAvatar(userData);
	}
	// Set session cookie
	if (priceId) {
		// await createCheckoutSession({ priceId, discountCode });
	} else {
		return NextResponse.redirect(`${requestUrl.origin}${redirectTo}`)
	}

	// Successful authentication, redirect to the intended page
	// Ensure we're using the correct origin
}
