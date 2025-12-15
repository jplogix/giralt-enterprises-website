'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Footer } from '@/components/footer'
import { Navigation } from '@/components/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface GalleryImage {
  id: string
  category: string
  title: string
  image: string
}

export default function BoardwalkPage() {
    const [examples, setExamples] = useState<Array<{ name: string; image: string }>>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch('/api/gallery', {
                    cache: 'no-store',
                    headers: {
                        'Cache-Control': 'no-cache',
                    },
                })
                const data = await res.json()
                const boardwalkImages = (data.images || []).filter(
                    (img: GalleryImage) => img.category === 'boardwalks'
                )
                
                const examplesData = boardwalkImages.map((img: GalleryImage) => ({
                    name: img.title,
                    image: img.image,
                }))
                
                setExamples(examplesData)
            } catch (error) {
                console.error('Error fetching images:', error)
                setExamples([])
            } finally {
                setLoading(false)
            }
        }
        fetchImages()
    }, [])

    return (
        <div className="min-h-screen">
            <Navigation />

            <section className="relative bg-linear-to-br from-primary to-accent text-primary-foreground py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-2 mb-4">
                            <Badge variant="secondary" className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20">
                                Marine Construction
                            </Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Boardwalks</h1>
                        <p className="text-xl text-primary-foreground/90 leading-relaxed">
                            Custom aluminum and timber boardwalk systems for parks, shorelines, and public access.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-center">Installation Examples</h2>
                    {loading ? (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">Loading examples...</p>
                        </div>
                    ) : examples.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">No installation examples available</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {examples.map((ex) => (
                            <div key={ex.name} className="overflow-hidden rounded-lg shadow">
                                <div className="relative h-64">
                                    <Image src={ex.image} alt={ex.name} fill className="object-cover" />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-center">{ex.name}</h3>
                                </div>
                            </div>
                            ))}
                        </div>
                    )}

                    <div className="max-w-2xl mx-auto mt-12">
                        <p className="text-center text-muted-foreground mb-6">We design boardwalks to meet site conditions, accessibility requirements, and budget constraints. Contact us for a custom proposal.</p>
                        <div className="text-center">
                            <Button size="lg" asChild>
                                <Link href="/contact">Request a Quote</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
