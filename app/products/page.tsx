'use client'

import { ArrowRight, Award } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Footer } from '@/components/footer'
import { Navigation } from '@/components/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

type Product = {
  title: string
  description: string
  image: string
  href: string
  features: string[]
  badge?: string
  category?: string
}

interface GalleryImage {
  id: string
  category: string
  title: string
  image: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      title: 'Handrails',
      description: 'Weld-free aluminum picket handrail system with DOT approvals from 6 states. High corrosion resistance and strength.',
      image: '/images/giralt/handrails/main_installation.jpg',
      href: '/products/handrails',
      features: ['No welding required', 'AA 6061-T6 aluminum', 'DOT approved', 'Award winning']
    },
    {
      title: 'Docks',
      description: 'Elite and standard fixed and floating dock systems. Structural members made of aluminum alloy 6061-T6 for high corrosion resistance.',
      image: '/images/giralt/docks/woodland_beach_fishing_pier.jpg',
      href: '/products/docks',
      features: ['Fixed & floating options', 'Multiple deck materials', 'Salt water resistant', 'Custom designs']
    },
    {
      title: 'Seawalls',
      description: 'Three types available: Aluminum, Vinyl, and FRP. Engineering analysis provided for proper material selection.',
      image: '/images/giralt/seawalls/vero_beach.jpg',
      href: '/products/seawalls',
      features: ['Aluminum, Vinyl, FRP', 'Engineering support', 'Site-specific design', 'Soils analysis']
    },
    {
      title: 'Pedestrian Bridges',
      description: 'Quick-install aluminum bridges with spans up to 90-100 feet. Can be delivered fully assembled.',
      image: '/images/giralt/pedestrian_bridges/long_key_natural_area.jpg',
      href: '/products/bridges',
      features: ['5 models available', 'Up to 100 ft spans', 'Quick installation', 'Fully assembled delivery']
    },
    {
      title: 'Wave Attenuators',
      description: 'Multiple configurations to break up wave energy and boat wake. Custom solutions based on site conditions.',
      image: '/images/giralt/wave_attenuators/terra_verde.jpg',
      href: '/products/wave-attenuators',
      features: ['4 configurations', 'Custom engineering', 'Energy dissipation', 'Marina protection']
    },
    {
      title: 'Gangways',
      description: 'Lightweight aluminum gangways and ramps for safe shore access. Custom lengths and handrail options.',
      image: '/images/giralt/pedestrian_bridges/long_key_natural_area.jpg',
      href: '/products/gangways',
      features: ['Custom lengths', 'ADA-compliant options', 'Lightweight aluminum', 'Modular sections']
    },
    {
      title: 'Bullet Railings',
      description: 'Decorative bullet-style railings for marinas, piers, and boardwalks. Available in marine-grade aluminum and custom finishes.',
      image: '/images/giralt/bullet_railings/bullet_railing_1.jpg',
      href: '/products/bullet-railings',
      features: ['Decorative bullet style', 'Aluminum construction', 'Custom finishes', 'Marine grade'],
      category: 'bullet-railings'
    },
    {
      title: '2-Line / 3-Line Railings',
      description: '2-line and 3-line railing systems for safety and a clean, nautical aesthetic. Easy-install systems for docks and walkways.',
      image: '/images/giralt/two_three_line_railings/2_line_example.jpg',
      href: '/products/two-three-line-railings',
      features: ['2-line and 3-line options', 'Easy install', 'Adjustable spacing', 'Saltwater resistant'],
      category: 'two-three-line-railings'
    },
  ])

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch('/api/gallery')
        const data = await res.json()
        const images: GalleryImage[] = data.images || []

        setProducts((prevProducts) =>
          prevProducts.map((product) => {
            if (product.category) {
              const categoryImage = images.find(
                (img) => img.category === product.category
              )
              if (categoryImage) {
                return { ...product, image: categoryImage.image }
              }
            }
            return product
          })
        )
      } catch (error) {
        console.error('Error fetching gallery images:', error)
      }
    }

    fetchImages()
  }, [])

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="bg-linear-to-br from-primary to-accent text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20">
              Products
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Quality Construction Products
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              We offer full engineering support for the design of these products, in addition to on-site installation oversight.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {products.map((product) => (
              <Link key={product.title} href={product.href} className="group">
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.badge && (
                      <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                        <Award size={14} className="mr-1" />
                        {product.badge}
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">{product.title}</h2>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {product.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full group-hover:bg-primary/90 transition-colors duration-300">
                      <span>
                        View Details
                        <ArrowRight className="ml-2 inline-block" size={16} />
                      </span>
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Technical Specifications?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contact us for PDF brochures and technical specifications for all our products
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">Contact Us for Technical Resources</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
