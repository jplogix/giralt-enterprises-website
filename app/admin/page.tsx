'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Image, FolderTree, LogOut, Upload } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ images: 0, categories: 0 })
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const fetchStats = useCallback(async () => {
    try {
      const [imagesRes, categoriesRes] = await Promise.all([
        fetch('/api/admin/images'),
        fetch('/api/admin/categories'),
      ])

      const images = await imagesRes.json()
      const categories = await categoriesRes.json()

      setStats({
        images: Array.isArray(images) ? images.length : 0,
        categories: Array.isArray(categories) ? categories.length : 0,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'logout' }),
      })
      router.push('/admin/login')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage gallery images and categories
          </p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Images
              </CardTitle>
              <CardDescription>Total gallery images</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.images}</div>
              <Link href="/admin/images">
                <Button variant="outline" className="mt-4 w-full">
                  Manage Images
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderTree className="h-5 w-5" />
                Categories
              </CardTitle>
              <CardDescription>Image categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.categories}</div>
              <Link href="/admin/categories">
                <Button variant="outline" className="mt-4 w-full">
                  Manage Categories
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>Common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/admin/images?action=upload">
                <Button variant="outline" className="w-full">
                  Upload New Image
                </Button>
              </Link>
              <Link href="/admin/categories?action=add">
                <Button variant="outline" className="w-full">
                  Add Category
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

