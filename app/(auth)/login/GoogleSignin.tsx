'use client'

import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'

import { Button } from '@/components/ui/button'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import { createClient } from '@/utils/supabase/client'

export default function GoogleSignin() {
	const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)
	const supabase = createClient()
	const { toast } = useToast()

	const searchParams = useSearchParams()

	const next = searchParams.get('next')

	async function signInWithGoogle() {
		setIsGoogleLoading(true)
		try {
			const { error } = await supabase.auth.signInWithOAuth({
				provider: 'google',
				options: {
					redirectTo: `${window.location.origin}/api/auth/callback${
						next ? `?next=${encodeURIComponent(next)}` : ''
					}`
					// queryParams: {
					// 	access_type: 'offline',
					// 	prompt: 'consent'
					// }
				}
			})

			if (error) {
				throw error
			}
		} catch (error) {
			toast({
				variant: 'destructive',
				title: 'Please try again.',
				description: 'There was an error logging in with Google.',
				action: <ToastAction altText="Try again">Try again</ToastAction>
			})
			console.log('error', error)

			setIsGoogleLoading(false)
		}
	}

	return (
		<Suspense fallback={<div>Loading google button...</div>}>
			<Button
				type="button"
				variant="outline"
				onClick={signInWithGoogle}
				disabled={isGoogleLoading}
			>
				{isGoogleLoading ? (
					<Loader2 className="mr-2 size-4 animate-spin" />
				) : (
					<Image
						src="https://authjs.dev/img/providers/google.svg"
						alt="Google logo"
						width={20}
						height={20}
						className="mr-2"
					/>
				)}{' '}
				Sign in with Google
			</Button>
		</Suspense>
	)
}
