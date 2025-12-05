'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Badge } from '@/components/ui/badge'
import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import Slider from 'react-slick'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function GalleryPage() {
  const [filter, setFilter] = useState('all')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const sliderRef = useRef<Slider>(null)

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'handrails', label: 'Handrails' },
    { id: 'docks', label: 'Docks' },
    { id: 'bridges', label: 'Pedestrian Bridges' },
    { id: 'seawalls', label: 'Seawalls' },
    { id: 'attenuators', label: 'Wave Attenuators' },
  ]

  const gallery = [
    { category: 'handrails', title: 'Main Installation', image: 'https://res.cloudinary.com/jp79/image/upload/v1763531620/giralt/handrails/main_installation.jpg' },
    { category: 'handrails', title: 'Pedestrian Bridge', image: 'https://res.cloudinary.com/jp79/image/upload/v1763522933/giralt/handrails/pedestrian_bridge.jpg' },
    { category: 'handrails', title: 'Griffin Road', image: 'https://res.cloudinary.com/jp79/image/upload/v1763522319/giralt/handrails/griffin_road.jpg' },
    { category: 'handrails', title: 'Donald Ross Road', image: 'https://res.cloudinary.com/jp79/image/upload/v1763531620/giralt/handrails/donald_ross_road.jpg' },
    { category: 'handrails', title: 'Evans Crary Bridge', image: 'https://res.cloudinary.com/jp79/image/upload/v1763531620/giralt/handrails/evans_crary_bridge.jpg' },
    { category: 'docks', title: 'Lafayette Hart Park', image: 'https://res.cloudinary.com/jp79/image/upload/v1763531620/giralt/docks/lafayette_hart_park.jpg' },
    { category: 'docks', title: 'Woodland Beach Fishing Pier', image: 'https://res.cloudinary.com/jp79/image/upload/v1763522933/giralt/docks/woodland_beach_fishing_pier.jpg' },
    { category: 'docks', title: 'Miramar Floating Gazebo', image: 'https://res.cloudinary.com/jp79/image/upload/v1763522933/giralt/docks/miramar_floating_gazebo.jpg' },
    { category: 'bridges', title: 'Long Key Natural Area', image: 'https://res.cloudinary.com/jp79/image/upload/v1763531620/giralt/pedestrian_bridges/long_key_natural_area.jpg' },
    { category: 'bridges', title: 'Richardson Park Boardwalk', image: 'https://res.cloudinary.com/jp79/image/upload/v1763531620/giralt/pedestrian_bridges/richardson_park_boardwalk.jpg' },
    { category: 'seawalls', title: 'Vero Beach', image: 'https://res.cloudinary.com/jp79/image/upload/v1763522933/giralt/seawalls/vero_beach.jpg' },
    { category: 'seawalls', title: 'Installation Detail', image: 'https://res.cloudinary.com/jp79/image/upload/v1763531620/giralt/seawalls/installation_detail.jpg' },
    { category: 'seawalls', title: 'Chula Vista Canal', image: 'https://res.cloudinary.com/jp79/image/upload/v1763531658/giralt/seawalls/chula_vista_canal.jpg' },
    { category: 'attenuators', title: 'Terra Verde', image: 'https://res.cloudinary.com/jp79/image/upload/v1763531659/giralt/wave_attenuators/terra_verde.jpg' },
    { category: 'attenuators', title: 'Haulover', image: 'https://res.cloudinary.com/jp79/image/upload/v1763531620/giralt/wave_attenuators/haulover.jpg' },
  ]

  const filteredGallery = filter === 'all' ? gallery : gallery.filter(item => item.category === filter)

  // Scroll slider to selected index when dialog opens
  useEffect(() => {
    if (!sliderRef.current || !isOpen) return
    
    sliderRef.current.slickGoTo(selectedIndex)
    setCurrentIndex(selectedIndex)
  }, [isOpen, selectedIndex])

  // Handle keyboard navigation for slider
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!sliderRef.current) return
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        sliderRef.current.slickPrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        sliderRef.current.slickNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Custom arrow components for react-slick
  const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
    <Button
      variant="outline"
      size="icon"
      className="absolute left-4 z-10 h-8 w-8 rounded-full bg-background/80 hover:bg-background border"
      onClick={onClick}
      type="button"
    >
      <ArrowLeft className="h-4 w-4" />
    </Button>
  )

  const NextArrow = ({ onClick }: { onClick?: () => void }) => (
    <Button
      variant="outline"
      size="icon"
      className="absolute right-4 z-10 h-8 w-8 rounded-full bg-background/80 hover:bg-background border"
      onClick={onClick}
      type="button"
    >
      <ArrowRight className="h-4 w-4" />
    </Button>
  )

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: selectedIndex,
    beforeChange: (_current: number, next: number) => {
      setCurrentIndex(next)
    },
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  }

  const handleImageClick = (index: number) => {
    setSelectedIndex(index)
    setIsOpen(true)
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-accent text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20">
              Gallery
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Project Gallery
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Explore our portfolio of completed installations across various product categories
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/90 sticky top-20 z-[45] border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Badge
                key={category.id}
                variant={filter === category.id ? 'default' : 'outline'}
                className="cursor-pointer text-sm py-2 px-4 hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => setFilter(category.id)}
              >
                {category.label}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGallery.map((item, index) => (
                <DialogTrigger key={index} asChild>
                  <Card 
                    className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300"
                    onClick={() => handleImageClick(index)}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-white font-semibold">{item.title}</h3>
                          <p className="text-white/80 text-sm capitalize">{item.category.replace('-', ' ')}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </DialogTrigger>
              ))}
            </div>
            <DialogContent className="max-w-[98vw] w-full p-0 overflow-hidden !grid !grid-rows-[1fr_auto]" showCloseButton={true} style={{ maxHeight: '98vh', height: '98vh' }}>
              <div className="relative w-full overflow-hidden" style={{ height: 'calc(98vh - 70px)' }}>
                <Slider ref={sliderRef} {...sliderSettings} className="h-full">
                  {filteredGallery.map((item, index) => (
                    <div key={index} className="h-full flex items-center justify-center p-4">
                      <div className="relative w-full h-full flex items-center justify-center">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="max-w-full max-h-full w-auto h-auto object-contain"
                          style={{ maxHeight: 'calc(98vh - 70px)', maxWidth: '98vw' }}
                        />
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="p-3 border-t bg-background">
                <h3 className="font-semibold text-center text-lg">{filteredGallery[currentIndex]?.title}</h3>
                <p className="text-muted-foreground text-center text-sm capitalize mt-1">
                  {filteredGallery[currentIndex]?.category.replace('-', ' ')}
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <Footer />
    </div>
  )
}
