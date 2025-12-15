'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Footer } from '@/components/footer'
import { Navigation } from '@/components/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

interface GalleryImage {
  id: string
  category: string
  title: string
  image: string
}

export default function GangwaysPage() {
    const [installations, setInstallations] = useState<Array<{ name: string; image: string }>>([])
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
                const gangwayImages = (data.images || []).filter(
                    (img: GalleryImage) => img.category === 'gangways'
                )
                
                const installationData = gangwayImages.map((img: GalleryImage) => ({
                    name: img.title,
                    image: img.image,
                }))
                
                setInstallations(installationData)
            } catch (error) {
                console.error('Error fetching images:', error)
                setInstallations([])
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
                            Products
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Gangways</h1>
                        <p className="text-xl text-primary-foreground/90 leading-relaxed">
                            Aluminum gangways and ramps for safe shoreline access. We offer modular gangways, ADA-compliant ramping, and custom handrail options.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <Card className="overflow-hidden">
                            {loading || installations.length === 0 ? (
                                <div className="relative h-64 bg-secondary animate-pulse" />
                            ) : (
                                <div className="relative h-64">
                                    <Image src={installations[0]?.image || "/placeholder.svg"} alt={installations[0]?.name || "Gangway"} fill className="object-cover" />
                                </div>
                            )}
                            <CardContent>
                                <h2 className="text-2xl font-bold mb-3">Modular Gangways</h2>
                                <p className="text-muted-foreground mb-4">Available in multiple lengths with optional handrail systems.</p>
                                <Button asChild>
                                    <Link href="/contact">Request Quote <ArrowRight className="ml-2 inline-block" size={16} /></Link>
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="overflow-hidden">
                            <CardContent>
                                <h3 className="text-xl font-semibold mb-3">Specifications</h3>
                                <ul className="list-disc list-inside text-muted-foreground">
                                    <li>Aluminum alloy 6061-T6 construction</li>
                                    <li>Multiple deck finishes (aluminum, composite)</li>
                                    <li>Custom lengths up to 100 ft (modular)</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    {installations.length > 1 && (
                        <div>
                            <h2 className="text-3xl font-bold mb-8 text-center">Installation Examples</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                                {installations.map((installation) => (
                                    <Dialog key={installation.name}>
                                        <DialogTrigger asChild>
                                            <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                                                <div className="relative h-64">
                                                    <Image
                                                        src={installation.image || "/placeholder.svg"}
                                                        alt={installation.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <CardContent className="pt-4">
                                                    <h3 className="font-semibold text-center">{installation.name}</h3>
                                                </CardContent>
                                            </Card>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-5xl p-0" showCloseButton={true}>
                                            <div className="relative w-full" style={{ minHeight: '400px', maxHeight: '90vh' }}>
                                                <Image
                                                    src={installation.image || "/placeholder.svg"}
                                                    alt={installation.name}
                                                    fill
                                                    className="object-contain"
                                                    sizes="(max-width: 1280px) 100vw, 1280px"
                                                />
                                            </div>
                                            <div className="p-4 border-t">
                                                <h3 className="font-semibold text-center text-lg">{installation.name}</h3>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    )
}
