import Image from 'next/image'
import Link from 'next/link'
import { Footer } from '@/components/footer'
import { Navigation } from '@/components/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function BulletRailingsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="bg-gradient-to-br from-primary to-accent text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20">
              Bullet Railings
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Bullet Railings</h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Decorative bullet-style railings for piers, boardwalks, and marinas. Available in marine-grade aluminum with a variety of finishes and mounting options.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <div className="relative h-80 rounded-lg overflow-hidden shadow">
                <Image src="/images/giralt/bullet_railings/bullet_railing_1.jpg" alt="Bullet Railing" fill className="object-cover" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Durable & Attractive</h2>
              <p className="text-muted-foreground mb-4">Our bullet railings combine a traditional look with modern corrosion-resistant materials. Custom spacing and finishes are available.</p>
              <ul className="list-disc pl-5 mb-6">
                <li>Marine-grade aluminum construction</li>
                <li>Custom finishes available</li>
                <li>Easy field installation</li>
                <li>Meets safety and aesthetic requirements</li>
              </ul>
              <Button asChild>
                <Link href="/contact">Request Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
