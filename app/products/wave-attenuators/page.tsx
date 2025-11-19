import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Waves, Download, AlertTriangle } from 'lucide-react'

export default function WaveAttenuatorsPage() {
  const installations = [
    { name: 'Terra Verde', image: 'https://res.cloudinary.com/jp79/image/upload/v1763531659/giralt/wave_attenuators/terra_verde.jpg' },
    { name: 'Haulover', image: 'https://res.cloudinary.com/jp79/image/upload/v1763531620/giralt/wave_attenuators/haulover.jpg' },
  ]

  const configurations = [
    {
      name: 'Vertical Slats',
      effectiveness: 'Low',
      description: 'Basic wave energy dissipation',
      badge: 'Basic'
    },
    {
      name: 'Horizontal Beams',
      effectiveness: 'Medium',
      description: 'Surprisingly effective for small facilities',
      badge: 'Economical'
    },
    {
      name: 'Angled Slats',
      effectiveness: 'High',
      description: 'Effective when proper spacing is used',
      badge: 'Recommended'
    },
    {
      name: 'Shadowbox',
      effectiveness: 'Very High',
      description: 'Most effective wave energy dissipation',
      badge: 'Premium'
    },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary to-accent text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <Waves size={32} />
              <Badge variant="secondary" className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20">
                Wave Protection
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Wave Attenuators
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Wave attenuators are used to break up the energy of wind-generated waves, and/or the wake of passing boats.
            </p>
          </div>
        </div>
      </section>

      {/* Installation Gallery */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Installation Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            {installations.map((installation) => (
              <Card key={installation.name} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64">
                  <img
                    src={installation.image || "/placeholder.svg"}
                    alt={installation.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-semibold text-center">{installation.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Configurations */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Physical Configurations</h2>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
            There are several physical configurations that can be used, each with different effectiveness levels
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {configurations.map((config) => (
              <Card key={config.name} className="border-2 hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold">{config.name}</h3>
                    <Badge variant={config.badge === 'Premium' ? 'default' : 'outline'}>
                      {config.badge}
                    </Badge>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-muted-foreground">Effectiveness:</span>
                      <Badge variant="secondary">{config.effectiveness}</Badge>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{config.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Details */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Performance Characteristics</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Least Effective</h3>
                    <p className="text-muted-foreground">
                      Typically, the <strong>vertical slats</strong> are the least effective configuration for wave energy dissipation.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Most Effective</h3>
                    <p className="text-muted-foreground">
                      The <strong>shadowbox design</strong> is the most effective configuration for breaking up wave energy.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Special Considerations</h3>
                    <p className="text-muted-foreground">
                      <strong>Angled slats</strong> have proven to be effective, but the clear spacing used is critical to proper performance. <strong>Horizontal beams</strong> can be surprisingly effective for small facilities.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <Card className="border-2 border-destructive/30 bg-destructive/5 max-w-4xl mx-auto">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="text-destructive flex-shrink-0 mt-1" size={32} />
                <div>
                  <h3 className="font-semibold text-xl mb-3">Important: Structural Considerations</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Wave attenuators add a tremendous amount of load to the piles. This can be a problem when installing a wave attenuator in an existing facility, because the piles may not have the required strength to support the additional load.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Let us know what your needs are. We'll come up with a "best" solution, taking all factors into account.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Selection Factors */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Selection Factors</h2>
            <p className="text-xl text-muted-foreground text-center mb-12">
              Which type is best for you will depend on many factors
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Wave Energy</h3>
                  <p className="text-sm text-muted-foreground">Total expected wave energy at the site</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Water Depths</h3>
                  <p className="text-sm text-muted-foreground">Depth variations and tidal ranges</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Prevailing Winds</h3>
                  <p className="text-sm text-muted-foreground">Direction and strength of wind patterns</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Fetch</h3>
                  <p className="text-sm text-muted-foreground">Distance over which wind can generate waves</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Boat Traffic</h3>
                  <p className="text-sm text-muted-foreground">Type and frequency of vessel wake</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Existing Structure</h3>
                  <p className="text-sm text-muted-foreground">Pile strength and load capacity</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Resources */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Technical Information</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-6">
                  For detailed technical information on the use of aluminum in wave attenuators
                </p>
                <Button size="lg" variant="outline">
                  <Download size={20} className="mr-2" />
                  Download Technical Documentation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Wave Protection?</h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            We'll evaluate your site conditions and recommend the best wave attenuator solution
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Request Site Analysis</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
