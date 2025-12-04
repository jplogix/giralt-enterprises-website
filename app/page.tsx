import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Award, CheckCircle2, FileText, Phone, ArrowRight, ShieldCheck } from 'lucide-react'

export default function HomePage() {
  const products = [
    {
      title: 'Handrails',
      description: 'Weld-free aluminum picket handrail system. DOT approved in 6 states.',
      image: 'https://res.cloudinary.com/jp79/image/upload/v1763531620/giralt/handrails/main_installation.jpg',
      href: '/products/handrails',
    },
    {
      title: 'Docks',
      description: 'Elite and standard fixed and floating dock systems with aluminum 6061-T6 construction.',
      image: 'https://res.cloudinary.com/jp79/image/upload/v1763531620/giralt/docks/lafayette_hart_park.jpg',
      href: '/products/docks',
    },
    {
      title: 'Seawalls',
      description: 'Aluminum, Vinyl and FRP seawall materials with full engineering support.',
      image: 'https://res.cloudinary.com/jp79/image/upload/v1763522933/giralt/seawalls/vero_beach.jpg',
      href: '/products/seawalls',
    },
    {
      title: 'Pedestrian Bridges',
      description: 'Quick-install aluminum bridges with spans up to 100 feet. Five models available.',
      image: 'https://res.cloudinary.com/jp79/image/upload/v1763531620/giralt/pedestrian_bridges/long_key_natural_area.jpg',
      href: '/products/bridges',
    },
    {
      title: 'Wave Attenuators',
      description: 'Multiple configurations to break up wave energy and boat wake.',
      image: 'https://res.cloudinary.com/jp79/image/upload/v1763531659/giralt/wave_attenuators/terra_verde.jpg',
      href: '/products/wave-attenuators',
    },
  ]

  const services = [
    {
      icon: CheckCircle2,
      title: 'Design Assistance',
      description: 'Expert engineering support for custom solutions'
    },
    {
      icon: FileText,
      title: 'Product Supply',
      description: 'Quality materials from trusted manufacturers'
    },
    {
      icon: ShieldCheck,
      title: 'Installation Oversight',
      description: 'On-site field support during installation'
    },
  ]

  const trustBadges = [
    { label: 'Since 1988', subtitle: '35+ Years Experience' },
    { label: 'DOT Approved', subtitle: '6 States' },
    { label: 'Award Winning', subtitle: 'Innovative System' },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[oklch(0.15_0.12_253)] via-primary to-[oklch(0.18_0.12_253)] text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('/blueprint-pattern.jpg')] opacity-20 bg-repeat invert" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[oklch(0.15_0.12_253)]/50 to-[oklch(0.15_0.12_253)]" />
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-4xl">
            <Badge variant="secondary" className="mb-6 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20">
              Trusted Since 1988
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Civil Engineering Products<br />for &ldquo;Difficult&rdquo; Projects
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 text-pretty leading-relaxed">
              Since 1988, we have provided manufacturer representation and distribution for quality Civil Engineering construction products. We thrive on those "difficult" projects, where product knowledge and applications expertise become indispensable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/products">
                  Explore Products
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link href="/contact">
                  <Phone className="mr-2" size={20} />
                  Contact Us
                </Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
              {trustBadges.map((badge) => (
                <div key={badge.label} className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-lg p-4 text-center">
                  <div className="font-bold text-lg">{badge.label}</div>
                  <div className="text-sm text-primary-foreground/80">{badge.subtitle}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Complete support from design to installation
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="border-2">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Products</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Quality construction materials with full engineering support
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link key={product.title} href={product.href}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {product.badge && (
                      <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{product.description}</p>
                    <div className="flex items-center text-primary font-medium">
                      Learn More <ArrowRight className="ml-2" size={16} />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 bg-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/blueprint-pattern.jpg')] opacity-10 bg-repeat invert" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Award className="mx-auto mb-6 text-accent" size={48} />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Award-Winning Innovation</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Our innovative weld-free handrail system earned the Florida Engineering Society's 2006 Governor's New Product Award and the National Society of Professional Engineers' 2007 New Product Award.
            </p>
            <Button size="lg" variant="outline" asChild>
              <Link href="/awards">
                View All Awards <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[oklch(0.15_0.12_253)] to-[oklch(0.18_0.12_253)] text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/blueprint-pattern.jpg')] opacity-20 bg-repeat invert" />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.15_0.12_253)]/80 to-transparent" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-primary-foreground/90">
            Contact us today and we'll show you how our 35+ years of experience can help you on your next project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Request a Quote</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link href="/products">Download Technical Specs</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
