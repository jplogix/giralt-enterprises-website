import Image from 'next/image'
import Link from 'next/link'
import { Footer } from '@/components/footer'
import { Navigation } from '@/components/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function TwoThreeLineRailingsPage() {
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
              <div className="relative h-80 rounded-lg overflow-hidden shadow">
                <Image src="/images/giralt/two_three_line_railings/2_line_example.jpg" alt="2-Line Railing" fill className="object-cover" />
              </div>
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

      <Footer />
    </div>
  )
}
