import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Footer } from '@/components/footer'
import { Navigation } from '@/components/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function GangwaysPage() {
    return (
        <div className="min-h-screen">
            <Navigation />

            <section className="bg-gradient-to-br from-primary to-accent text-primary-foreground py-20">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="overflow-hidden">
                            <div className="relative h-64">
                                <Image src="/images/giralt/pedestrian_bridges/long_key_natural_area.jpg" alt="Gangway" fill className="object-cover" />
                            </div>
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
                </div>
            </section>

            <Footer />
        </div>
    )
}
