'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { logout } from './action'

export default function LogoutButton({ className }: { className?: string }) {
	const [isLoading, setIsLoading] = useState(false)

	const handleLogout = async () => {
		setIsLoading(true)
		await logout()
		setIsLoading(false)
	}

	return (
		<Button onClick={handleLogout} disabled={isLoading} className={className}>
			{isLoading ? 'Logging out...' : 'Logout'}
		</Button>
	)
}
