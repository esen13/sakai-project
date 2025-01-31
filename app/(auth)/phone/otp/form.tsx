'use client'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot
} from '@/components/ui/input-otp'
import { isCheckLengthNumber, sleep } from '@/helpers'
import { toast } from '@/hooks/use-toast'
import { otpSchema } from '@/validations/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { otpCheck } from './action'

const formSchema = z.object({
	otp: otpSchema
})

export default function OtpForm() {
	const [serverError, setServerError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const phone = useSearchParams().get('phone') || ''
	const router = useRouter()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			otp: ''
		}
	})

	const handleSubmit = async (data: z.infer<typeof formSchema>) => {
		setServerError(null)
		setIsLoading(true)

		try {
			if (isCheckLengthNumber(phone?.trim())) {
				const response = await otpCheck({
					phone: phone?.trim(),
					otp: data.otp
				})

				if (response.error) {
					setServerError(response.message)
				} else {
					toast({
						variant: 'success',
						title: response.message
					})
					await sleep(2000)
					router.push('/dashboard')
				}
			} else {
				toast({
					variant: 'destructive',
					title: 'Invalid phone number',
					description: 'Please enter a valid phone number'
				})
			}
		} catch (error) {
			console.warn('error', error)
			setServerError('An unexpected error occurred. Please try again.')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<main className="flex justify-center items-center min-h-screen">
			<Card className="w-[380px]">
				<CardHeader>
					<CardTitle>Login with OTP</CardTitle>
					<CardDescription>Login to your account</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleSubmit)}
							className="flex flex-col gap-4 space-y-4"
						>
							<FormField
								control={form.control}
								name="otp"
								render={({ field }) => (
									<FormItem className="space-y-2">
										<FormLabel className="">OTP</FormLabel>
										<FormControl className="mt-6">
											<InputOTP
												maxLength={6}
												{...field}
												autoFocus
												pattern="[0-9]*"
											>
												<InputOTPGroup>
													<InputOTPSlot index={0} />
													<InputOTPSlot index={1} />
													<InputOTPSlot index={2} />
													<InputOTPSlot index={3} />
													<InputOTPSlot index={4} />
													<InputOTPSlot index={5} />
												</InputOTPGroup>
											</InputOTP>
										</FormControl>
										{serverError && (
											<FormDescription className="dark:text-red-500 mt-2">
												{serverError}
											</FormDescription>
										)}
										<FormMessage />
									</FormItem>
								)}
							/>

							{serverError && (
								<p className="text-red-500 text-sm mt-2">{serverError}</p>
							)}
							<Button type="submit" disabled={isLoading}>
								{isLoading ? (
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								) : (
									'Sign in'
								)}
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter className="flex-col gap-2">
					<div className="text-muted-foreground text-sm">
						Don't have an account?{' '}
						<Link href="/register" className="underline">
							Sign Up
						</Link>
					</div>
				</CardFooter>
			</Card>
		</main>
	)
}
