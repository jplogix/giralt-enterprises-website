'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Badge } from '@/components/ui/badge'
import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'

// Custom styles for the image gallery in dialog
const customStyles = `
  .image-gallery-container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custom-image-gallery {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custom-image-gallery .image-gallery-slide-wrapper {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custom-image-gallery .image-gallery-slide {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .custom-image-gallery .image-gallery-image {
    max-height: calc(98vh - 70px);
    max-width: 98vw;
    width: auto !important;
    height: auto !important;
    object-fit: contain;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .custom-image-gallery .image-gallery-content {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custom-image-gallery .image-gallery-slide .image-gallery-image {
    max-height: calc(98vh - 70px) !important;
    max-width: 98vw !important;
    width: auto !important;
    height: auto !important;
    position: relative;
    top: auto;
    left: auto;
    transform: none;
  }

  .custom-image-gallery .image-gallery-nav {
    height: 100%;
  }

  .custom-image-gallery .image-gallery-left-nav,
  .custom-image-gallery .image-gallery-right-nav {
    padding: 0;
    background: rgba(0, 0, 0, 0.5);
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin: 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custom-image-gallery .image-gallery-left-nav:hover,
  .custom-image-gallery .image-gallery-right-nav:hover {
    background: rgba(0, 0, 0, 0.8);
  }

  .custom-image-gallery .image-gallery-left-nav::before,
  .custom-image-gallery .image-gallery-right-nav::before {
    border: solid white;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 6px;
  }

  .custom-image-gallery .image-gallery-left-nav::before {
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
    margin-left: 4px;
  }

  .custom-image-gallery .image-gallery-right-nav::before {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    margin-right: 4px;
  }

  .custom-image-gallery .image-gallery-bullets {
    bottom: 10px;
    position: absolute;
    z-index: 10;
  }

  .custom-image-gallery .image-gallery-bullet {
    border: 1px solid #fff;
    background: rgba(255, 255, 255, 0.4);
  }

  .custom-image-gallery .image-gallery-bullet.active {
    background: #fff;
  }

  .custom-image-gallery .image-gallery-fullscreen-button {
    background: rgba(0, 0, 0, 0.5);
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 10px;
  }

  .custom-image-gallery .image-gallery-fullscreen-button:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`

export default function GalleryPage() {
  const [filter, setFilter] = useState('all')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const galleryRef = useRef<ImageGallery>(null)

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

  // Convert gallery items to ImageGallery format
  const galleryImages = filteredGallery.map((item) => ({
    original: item.image,
    thumbnail: item.image,
    originalAlt: item.title,
    thumbnailAlt: item.title,
    description: `${item.title} - ${item.category.replace('-', ' ')}`,
  }))

  // Set gallery to selected index when dialog opens
  useEffect(() => {
    if (!galleryRef.current || !isOpen) return

    // Small delay to ensure dialog is fully rendered
    const timer = setTimeout(() => {
      galleryRef.current?.slideToIndex(selectedIndex)
    }, 100)

    return () => clearTimeout(timer)
  }, [isOpen, selectedIndex])

  // Inject custom styles
  useEffect(() => {
    const styleId = 'image-gallery-custom-styles'
    let styleElement = document.getElementById(styleId) as HTMLStyleElement

    if (!styleElement) {
      styleElement = document.createElement('style')
      styleElement.id = styleId
      document.head.appendChild(styleElement)
    }

    styleElement.innerHTML = customStyles

    return () => {
      if (styleElement?.parentNode) {
        styleElement.parentNode.removeChild(styleElement)
      }
    }
  }, [])

  // Handle keyboard navigation for image gallery
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!galleryRef.current) return

      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        galleryRef.current.slideToIndex(Math.max(0, selectedIndex - 1))
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        galleryRef.current.slideToIndex(Math.min(galleryImages.length - 1, selectedIndex + 1))
      } else if (e.key === 'Escape') {
        e.preventDefault()
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedIndex, galleryImages.length])

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
                <DialogTrigger key={`${item.category}-${item.title}`} asChild>
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
            <DialogContent className="max-w-[98vw] w-full p-0 overflow-hidden" showCloseButton={true} style={{ maxHeight: '98vh', height: '98vh', display: 'flex', flexDirection: 'column' }}>
              <div className="flex-1 relative" style={{ height: 'calc(98vh - 70px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ImageGallery
                  ref={galleryRef}
                  items={galleryImages}
                  showPlayButton={false}
                  showFullscreenButton={true}
                  showNav={true}
                  showThumbnails={false}
                  showBullets={true}
                  showIndex={false}
                  startIndex={selectedIndex}
                  onSlide={(currentIndex: number) => setSelectedIndex(currentIndex)}
                  additionalClass="custom-image-gallery"
                  useBrowserFullscreen={false}
                  preventSwipe={false}
                  swipeThreshold={30}
                  slideOnThumbnailOver={false}
                  lazyLoad={true}
                  slideDuration={300}
                  useTranslate3D={true}
                  styles={{
                    container: { height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
                    image: { maxHeight: 'calc(98vh - 70px)', maxWidth: '98vw', objectFit: 'contain' }
                  }}
                />
              </div>
              <div className="p-3 border-t bg-background flex-shrink-0">
                <h3 className="font-semibold text-center text-lg">{filteredGallery[selectedIndex]?.title}</h3>
                <p className="text-muted-foreground text-center text-sm capitalize mt-1">
                  {filteredGallery[selectedIndex]?.category.replace('-', ' ')}
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
