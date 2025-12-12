import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/admin-auth'
import { Navigation } from '@/components/navigation'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      {children}
    </div>
  )
}

