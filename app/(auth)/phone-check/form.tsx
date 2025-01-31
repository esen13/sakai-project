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
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { PhoneInput } from '@/components/ui/phone-input'
import { isCheckLengthNumber, sleep } from '@/helpers'
import { toast } from '@/hooks/use-toast'
import { phoneSchema } from '@/validations/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { phoneCheck } from './action'

const formSchema = z.object({
	phone: phoneSchema
})

export default function PhoneOtpForm() {
	const [serverError, setServerError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const router = useRouter()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			phone: '+996'
		}
	})

	const handleSubmit = async (data: z.infer<typeof formSchema>) => {
		setServerError(null)
		setIsLoading(true)

		try {
			if (isCheckLengthNumber(data.phone)) {
				const response = await phoneCheck({
					phone: data.phone
				})

				if (response.error) {
					setServerError(response.message)
				} else {
					toast({
						variant: 'success',
						title: response.message
					})
					await sleep(2000)
					router.push(`/phone-check/otp?phone=${data.phone}`)
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
							className="flex flex-col gap-2"
						>
							<FormField
								control={form.control}
								name="phone"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Phone</FormLabel>
										<FormControl>
											<PhoneInput
												value={field.value}
												onChange={field.onChange}
											/>
										</FormControl>
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
									'Continue'
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
