'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CategoryEditor } from '@/components/admin/category-editor'
import { GitCommit } from '@/components/admin/git-commit'
import { ArrowLeft } from 'lucide-react'

interface Category {
  id: string
  label: string
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories')
      const data = await response.json()
      setCategories(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Category Management</h1>
            <p className="text-muted-foreground mt-2">
              Manage image categories
            </p>
          </div>
        </div>
        <GitCommit />
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <CategoryEditor categories={categories} onUpdate={fetchCategories} />
      )}
    </div>
  )
}

