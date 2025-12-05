import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Image
              src="/GIRALT-LOGO-NEW.svg"
              alt="Giralt Enterprises"
              width={240}
              height={80}
              className="h-16 w-auto brightness-0 invert"
            />
            <p className="text-sm text-primary-foreground/80">
              Quality Civil Engineering construction products since 1988
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/products" className="hover:text-accent transition-colors">Products</Link></li>
              <li><Link href="/gallery" className="hover:text-accent transition-colors">Gallery</Link></li>
              <li><Link href="/awards" className="hover:text-accent transition-colors">Awards</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Products</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products/handrails" className="hover:text-accent transition-colors">Handrails</Link></li>
              <li><Link href="/products/docks" className="hover:text-accent transition-colors">Docks</Link></li>
              <li><Link href="/products/seawalls" className="hover:text-accent transition-colors">Seawalls</Link></li>
              <li><Link href="/products/bridges" className="hover:text-accent transition-colors">Pedestrian Bridges</Link></li>
              <li><Link href="/products/wave-attenuators" className="hover:text-accent transition-colors">Wave Attenuators</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>1271 SW 124th Court<br />Unit G<br />Miami, Florida 33184</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <a href="tel:786-246-7002" className="hover:text-accent transition-colors">786-246-7002</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:info@giraltenterprises.com" className="hover:text-accent transition-colors">info@giraltenterprises.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Giralt Enterprises, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
