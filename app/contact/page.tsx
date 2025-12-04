'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    console.log('Form submitted:', formData)
  }

  const contactInfo = [
    { icon: MapPin, label: 'Address', value: '1271 SW 124th Court, Unit G, Miami, Florida 33184' },
    { icon: Phone, label: 'Phone', value: '786-246-7002', href: 'tel:786-246-7002' },
    { icon: Mail, label: 'Email', value: 'info@giraltenterprises.com', href: 'mailto:info@giraltenterprises.com' },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-accent text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20">
              Contact Us
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Contact us today and we'll show you how our 35+ years of experience can help you on your next project.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(305) 555-0123"
                      />
                    </div>
                    <div>
                      <Label htmlFor="projectType">Project Type</Label>
                      <Input
                        id="projectType"
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        placeholder="e.g., Handrails, Docks, Seawalls"
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your project..."
                        rows={6}
                      />
                    </div>
                    <Button type="submit" size="lg" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <Card key={info.label}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <info.icon className="text-primary" size={24} />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{info.label}</h3>
                          {info.href ? (
                            <a href={info.href} className="text-muted-foreground hover:text-primary transition-colors">
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-muted-foreground">{info.value}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="text-primary" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Business Hours</h3>
                        <p className="text-muted-foreground">Monday - Friday</p>
                        <p className="text-muted-foreground">8:00 AM - 5:00 PM EST</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Location</h2>
          <div className="max-w-5xl mx-auto">
            <Card className="overflow-hidden">
              <div className="relative h-96 bg-muted">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.079876543!2d-80.389!3d25.67!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b6a8b8b8b8b9%3A0x8b8b8b8b8b8b8b8b!2s1271%20SW%20124th%20Ct%20G%2C%20Miami%2C%20FL%2033184!5e0!3m2!1sen!2sus!4v1704067200000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Giralt Enterprises Location"
                />
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
