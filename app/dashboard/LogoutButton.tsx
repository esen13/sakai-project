'use client'

import { Button } from '@/components/ui/button'
import { logout } from '@/queries/user'
import { useState } from 'react'

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
