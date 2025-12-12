'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Footer } from '@/components/footer'
import { Navigation } from '@/components/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function BoardwalkPage() {
    const examples = [
        { name: 'Sunset Boardwalk', image: '/images/giralt/boardwalk/sunset_boardwalk.jpg' },
        { name: 'Shoreline Boardwalk', image: '/images/giralt/boardwalk/shoreline_boardwalk.jpg' },
        { name: 'Lakeside Boardwalk', image: '/images/giralt/boardwalk/boardwalk_01.jpg' },
        { name: 'Curved Boardwalk', image: '/images/giralt/boardwalk/boardwalk_02.jpg' },
        { name: 'Wetland Boardwalk', image: '/images/giralt/boardwalk/boardwalk_03.jpg' }
    ]

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
