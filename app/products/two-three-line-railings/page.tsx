'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Footer } from '@/components/footer'
import { Navigation } from '@/components/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface GalleryImage {
  id: string
  category: string
  title: string
  image: string
}

export default function TwoThreeLineRailingsPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch('/api/gallery')
        const data = await res.json()
        const railingImages = (data.images || []).filter(
          (img: GalleryImage) => img.category === 'two-three-line-railings'
        )
        setImages(railingImages)
      } catch (error) {
        console.error('Error fetching images:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchImages()
  }, [])

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="bg-linear-to-br from-primary to-accent text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20">
              2-Line / 3-Line Railings
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">2-Line & 3-Line Railings</h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Flexible 2-line and 3-line railing systems for docks and walkways — designed for safety and unobstructed views. Available in multiple finishes and post styles.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              {loading ? (
                <div className="relative h-80 rounded-lg overflow-hidden shadow bg-secondary animate-pulse" />
              ) : images.length > 0 ? (
                <div className="relative h-80 rounded-lg overflow-hidden shadow">
                  <Image 
                    src={images[0].image || "/placeholder.svg"} 
                    alt={images[0].title || "2-Line Railing"} 
                    fill 
                    className="object-cover" 
                  />
                </div>
              ) : (
                <div className="relative h-80 rounded-lg overflow-hidden shadow bg-secondary flex items-center justify-center">
                  <p className="text-muted-foreground">No images available</p>
                </div>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Simple & Effective</h2>
              <p className="text-muted-foreground mb-4">Our 2-line and 3-line systems provide a clean, nautical look while maintaining safety. They are economical and quick to install.</p>
              <ul className="list-disc pl-5 mb-6">
                <li>2-line and 3-line configurations</li>
                <li>Adjustable tension and spacing</li>
                <li>Corrosion resistant materials</li>
                <li>Customizable end fittings</li>
              </ul>
              <Button asChild>
                <Link href="/contact">Request Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {images.length > 1 && (
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Installation Examples</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {images.map((image) => (
                <Card key={image.id} className="overflow-hidden">
                  <div className="relative h-64">
                    <Image 
                      src={image.image || "/placeholder.svg"} 
                      alt={image.title} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-semibold text-center">{image.title}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
