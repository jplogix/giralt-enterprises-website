'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === '/admin/login') {
      setIsAuthenticated(true)
      return
    }

    // Check authentication
    fetch('/api/admin/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'check' }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          router.push('/admin/login')
        } else {
          setIsAuthenticated(true)
        }
      })
      .catch(() => {
        router.push('/admin/login')
      })
  }, [pathname, router])

  // Show nothing while checking (or if not authenticated and not on login page)
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  if (isAuthenticated === null) {
    return null // or a loading spinner
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}

