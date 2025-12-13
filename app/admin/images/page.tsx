'use client'

import { useEffect, useState } from 'react'
import UploadClient from './upload-client'
import ImageGrid from '@/components/admin/ImageGrid'

export default function AdminImagesPage() {
  const [images, setImages] = useState<any[]>([])

  const fetchImages = async () => {
    const res = await fetch('/api/admin/images')
    const json = await res.json()
    setImages(json.images || [])
  }

  useEffect(() => {
    fetchImages()
  }, [])

  const handleUploaded = (res: any) => {
    fetchImages()
  }

  const handleEdit = async (img: any) => {
    const title = prompt('Title', img.title) || img.title
    const alt = prompt('Alt', img.alt || '') || img.alt
    await fetch(`/api/admin/images/${encodeURIComponent(img.id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN || ''}` },
      body: JSON.stringify({ title, alt })
    })
    fetchImages()
  }

  const handleDelete = async (img: any) => {
    if (!confirm('Delete image?')) return
    await fetch(`/api/admin/images/${encodeURIComponent(img.id)}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN || ''}` }
    })
    fetchImages()
  }

  return (
    <div className="min-h-screen container mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Manage Images</h1>

      <div className="mb-8">
        <UploadClient onUploaded={handleUploaded} />
      </div>

      <ImageGrid images={images} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  )
}
'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ImageUpload } from '@/components/admin/image-upload'
import { ImageList } from '@/components/admin/image-list'
import { ArrowLeft, Plus } from 'lucide-react'

interface GalleryImage {
  id: string
  category: string
  title: string
  image: string
  createdAt: string
  updatedAt: string
}

interface Category {
  id: string
  label: string
}

export default function ImagesPage() {
  const searchParams = useSearchParams()
  const showUpload = searchParams.get('action') === 'upload'
  
  const [images, setImages] = useState<GalleryImage[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    try {
      const [imagesRes, categoriesRes] = await Promise.all([
        fetch('/api/admin/images'),
        fetch('/api/admin/categories'),
      ])

      const imagesData = await imagesRes.json()
      const categoriesData = await categoriesRes.json()

      setImages(Array.isArray(imagesData) ? imagesData : [])
      setCategories(Array.isArray(categoriesData) ? categoriesData : [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const filteredImages = selectedCategory === 'all'
    ? images
    : images.filter(img => img.category === selectedCategory)

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
            <h1 className="text-3xl font-bold">Image Management</h1>
            <p className="text-muted-foreground mt-2">
              Manage gallery images
            </p>
          </div>
        </div>
        {!showUpload && (
          <Link href="/admin/images?action=upload">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
          </Link>
        )}
      </div>

      {showUpload ? (
        <div className="max-w-2xl mx-auto">
          <ImageUpload categories={categories} onSuccess={() => {
            fetchData()
            window.history.replaceState({}, '', '/admin/images')
          }} />
          <div className="mt-4">
            <Link href="/admin/images">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Images
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-4 mb-6">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              {filteredImages.length} image{filteredImages.length !== 1 ? 's' : ''}
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No images found</p>
              <Link href="/admin/images?action=upload">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Your First Image
                </Button>
              </Link>
            </div>
          ) : (
            <ImageList
              images={filteredImages}
              categories={categories}
              onUpdate={fetchData}
            />
          )}
        </>
      )}
    </div>
  )
}

