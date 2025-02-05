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
import { Input } from '@/components/ui/input'
import { passwordSchema } from '@/validations/passwordSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Suspense, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { loginUser } from './action'
import GoogleSignin from './GoogleSignin'

const formSchema = z.object({
	email: z.string().email(),
	password: passwordSchema
})

export default function LoginForm() {
	const [serverError, setServerError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const router = useRouter()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const handleSubmit = async (data: z.infer<typeof formSchema>) => {
		setServerError(null)
		setIsLoading(true)

		try {
			const response = await loginUser({
				email: data.email,
				password: data.password
			})

			if (response.error) {
				setServerError(response.message)
			} else {
				router.push('/dashboard')
			}
		} catch (error) {
			console.warn(error)
			setServerError('An unexpected error occurred. Please try again.')
			setIsLoading(false)
		}
	}

	const email = form.getValues('email')

	return (
		<main className="flex justify-center items-center min-h-screen">
			<Card className="w-[380px]">
				<CardHeader>
					<CardTitle>Login</CardTitle>
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
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input {...field} type="password" />
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
									'Sign in'
								)}
							</Button>

							<Suspense
								fallback={<Loader2 className="my-10 h-4 w-4 animate-spin" />}
							>
								<GoogleSignin />
							</Suspense>
						</form>
					</Form>
					<Button
						className="w-full mt-4"
						variant="outline"
						onClick={() => router.push('/phone')}
					>
						Login with OTP
					</Button>
				</CardContent>
				<CardFooter className="flex-col gap-2">
					<div className="text-muted-foreground text-sm">
						Don't have an account?{' '}
						<Link href="/register" className="underline">
							Sign Up
						</Link>
					</div>
					<div className="text-muted-foreground text-sm">
						Forgot password?{' '}
						<Link
							href={`/forgot-password${
								email ? `?email=${encodeURIComponent(email)}` : ''
							}`}
							className="underline"
						>
							Reset my password
						</Link>
					</div>
				</CardFooter>
			</Card>
		</main>
	)
}
