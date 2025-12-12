'use client'

import { Anchor, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Footer } from '@/components/footer'
import { Navigation } from '@/components/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function DocksPage() {
  const installations = [
    { name: 'Atlantic Village', image: '/IMG_0450-Resized.jpg' },
    { name: 'Woodland Beach Fishing Pier', image: 'https://res.cloudinary.com/jp79/image/upload/v1763522933/giralt/docks/woodland_beach_fishing_pier.jpg' },
    { name: 'Miramar Floating Gazebo', image: 'https://res.cloudinary.com/jp79/image/upload/v1763522933/giralt/docks/miramar_floating_gazebo.jpg' },
  ]

  const dockTypes = [
    { name: 'Elite Fixed Piers', description: 'Premium fixed pier systems with superior durability' },
    { name: 'Elite Floating Docks', description: 'High-end floating dock solutions' },
    { name: 'Standard Fixed Docks', description: 'Reliable fixed dock systems' },
    { name: 'Standard Gangways', description: 'Access solutions for various applications' },
    { name: 'Standard Floating Docks', description: 'Cost-effective floating dock options' },
  ]

  const deckOptions = [
    'Aluminum',
    'Pressure Treated Lumber',
    'High Density Lumber (Ipe)',
    'Plastic Lumber',
    'Concrete'
  ]

  const flotationOptions = [
    'Polystyrene Tubs',
    'Aluminum-Encased Polyurethane',
    'Full Foam Polyurethane'
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative bg-linear-to-br from-primary to-accent text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <Anchor size={32} />
              <Badge variant="secondary" className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20">
                Marine Construction
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Aluminum Dock Systems
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              All of our docks have a common element: structural members made of aluminum alloy 6061-T6. This alloy has a unique combination of high corrosion resistance, even in salt water environments, and high strength.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Why Aluminum 6061-T6?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <Card>
                <CardContent className="pt-6">
                  <CheckCircle2 className="text-accent mb-3" size={32} />
                  <h3 className="text-xl font-semibold mb-2">High Corrosion Resistance</h3>
                  <p className="text-muted-foreground">
                    Exceptional performance even in harsh salt water environments. Built to withstand marine conditions.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <CheckCircle2 className="text-accent mb-3" size={32} />
                  <h3 className="text-xl font-semibold mb-2">Superior Strength</h3>
                  <p className="text-muted-foreground">
                    Comparable yield strength to steel while offering better corrosion resistance and lighter weight.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Customization */}
            <Card className="bg-secondary/30 border-2">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Complete Customization</h2>
                <p className="text-muted-foreground mb-6">
                  Beyond the structural members, pretty much all the other choices are yours. All we need from you is a list of your needs.
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Deck Material Options</h3>
                    <div className="flex flex-wrap gap-2">
                      {deckOptions.map((option) => (
                        <Badge key={option} variant="outline" className="text-sm py-1.5">
                          {option}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3">Flotation Options (Floating Docks)</h3>
                    <div className="flex flex-wrap gap-2">
                      {flotationOptions.map((option) => (
                        <Badge key={option} variant="outline" className="text-sm py-1.5">
                          {option}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Installation Examples</h2>
          <Tabs defaultValue="fixed">
            <TabsList className="mx-auto mb-6 w-full max-w-md">
              <TabsTrigger value="fixed">Fixed Docks</TabsTrigger>
              <TabsTrigger value="floating">Floating Docks</TabsTrigger>
              <TabsTrigger value="gangways">Gangways</TabsTrigger>
            </TabsList>

            <TabsContent value="fixed">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {installations.filter(i => i.name === 'Atlantic Village').map((installation) => (
                  <Card key={installation.name} className="overflow-hidden">
                    <div className="relative h-64">
                      <Image src={installation.image || "/placeholder.svg"} alt={installation.name} fill className="object-cover" />
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="font-semibold text-center">{installation.name}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="floating">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                <Card className="overflow-hidden">
                  <div className="relative h-64">
                    <Image src="/images/giralt/floating_docks/miramar_floating_gazebo.jpg" alt="Miramar Floating Gazebo" fill className="object-cover" />
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-semibold text-center">Miramar Floating Gazebo</h3>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden">
                  <div className="relative h-64">
                    <Image src="/images/giralt/floating_docks/woodland_beach_fishing_pier.jpg" alt="Woodland Beach Fishing Pier" fill className="object-cover" />
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-semibold text-center">Woodland Beach Fishing Pier</h3>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="gangways">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                <Card className="overflow-hidden">
                  <div className="relative h-64">
                    <Image src="/images/giralt/gangways/long_key_natural_area_gangway.jpg" alt="Long Key Gangway" fill className="object-cover" />
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-semibold text-center">Long Key Gangway</h3>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden">
                  <div className="relative h-64">
                    <Image src="/images/giralt/gangways/richardson_park_gangway.jpg" alt="Richardson Park Gangway" fill className="object-cover" />
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-semibold text-center">Richardson Park Gangway</h3>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Dock Types */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Available Dock Systems</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {dockTypes.map((type) => (
              <Card key={type.name} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">{type.name}</h3>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Resources */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Technical Resources</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-6">
                  For technical specifications and drawings for our dock systems, please contact us:
                </p>
                <Button size="lg" className="w-full" asChild>
                  <Link href="/contact">Contact Us for Technical Resources</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-linear-to-r from-primary to-accent text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Design Your Dock?</h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Contact us with your requirements and we'll create a custom solution
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Request a Quote</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
