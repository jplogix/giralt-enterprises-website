import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { Award, MapPin, Download } from 'lucide-react'

export default function AwardsPage() {
  const awards = [
    {
      year: '2006',
      title: "Governor's New Product Award",
      organization: 'Florida Engineering Society / Florida Petroleum Equipment Institute',
      description: 'Recognized for innovation in engineering product development',
      image: '/GovernorsNewProductAward.jpeg'
    },
    {
      year: '2006',
      title: 'FEI Award',
      organization: 'Florida Engineering Society / Florida Petroleum Equipment Institute',
      description: 'Recognition for engineering excellence and innovation',
      image: '/FEI_Award.jpeg'
    },
    {
      year: '2007',
      title: 'New Product Award',
      organization: 'National Society of Professional Engineers / PEI',
      description: 'National recognition for groundbreaking handrail system design',
      image: '/NSPEAward.jpeg'
    },
  ]

  const dotApprovals = [
    { state: 'Florida', year: '2006' },
    { state: 'Virginia', year: '2007' },
    { state: 'New York', year: '2008' },
    { state: 'Alabama', year: '2009' },
    { state: 'Georgia', year: '2010' },
    { state: 'South Carolina', year: '2011' },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-accent text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Award className="mx-auto mb-6" size={64} />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Award-Winning Innovation
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Our patented weld-free handrail system has earned prestigious recognition from both state and national engineering societies
            </p>
          </div>
        </div>
      </section>

      {/* Patent Innovation */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-secondary/30 border-2 border-accent/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="text-accent" size={32} />
                  </div>
                  <div>
                    <Badge className="mb-2">2002</Badge>
                    <h2 className="text-2xl font-bold mb-2">Patented Innovation</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      In 2002, we invented and patented a system of picket handrails that requires no welding of the pickets. This revolutionary approach simplified installation while maintaining superior structural integrity.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Industry Recognition</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {awards.map((award, index) => (
              <Card key={`${award.year}-${index}`} className="border-2 hover:shadow-xl transition-shadow overflow-hidden">
                <div className="relative h-64 bg-muted">
                  <Image
                    src={award.image}
                    alt={`${award.title} - ${award.organization}`}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="flex-shrink-0">{award.year}</Badge>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold mb-2">{award.title}</h3>
                      <p className="text-xs font-medium text-accent mb-2">{award.organization}</p>
                      <p className="text-muted-foreground text-sm">{award.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* DOT Approvals */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Department of Transportation Approvals</h2>
              <p className="text-xl text-muted-foreground">
                Our patented handrail system has received official approvals from six state DOTs
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dotApprovals.map((approval) => (
                <Card key={approval.state} className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
                  <CardContent className="pt-6 text-center">
                    <MapPin className="mx-auto mb-3 text-primary" size={32} />
                    <h3 className="text-lg font-bold mb-1">{approval.state}</h3>
                    <p className="text-sm text-muted-foreground">Approved {approval.year}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Image and Specs */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">View The Product</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="overflow-hidden">
                <div className="relative h-64">
                  <img
                    src="https://res.cloudinary.com/jp79/image/upload/v1763531620/giralt/handrails/main_installation.jpg"
                    alt="Finished Handrail Product"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-semibold text-center">Finished Product</h3>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <div className="relative h-64 bg-muted flex items-center justify-center">
                  <div className="text-center p-8">
                    <Download className="mx-auto mb-4 text-muted-foreground" size={48} />
                    <p className="text-sm text-muted-foreground">Technical Drawing</p>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-semibold text-center">Technical Specifications</h3>
                </CardContent>
              </Card>
            </div>
            <div className="mt-8 text-center">
              <Button size="lg" asChild>
                <Link href="/products/handrails">
                  View Complete Product Details
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
