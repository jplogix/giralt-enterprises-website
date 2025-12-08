'use client'

import { useEffect, useRef, useState } from 'react'
import ImageGallery from 'react-image-gallery'
import { Footer } from '@/components/footer'
import { Navigation } from '@/components/navigation'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import 'react-image-gallery/styles/css/image-gallery.css'
import Image from 'next/image'

// Custom styles for the image gallery in dialog
const customStyles = `
  .custom-image-gallery {
    height: 100%;
    width: 100%;
    background: #000;
    position: relative;
  }

  .custom-image-gallery .image-gallery-content,
  .custom-image-gallery .image-gallery-slide-wrapper,
  .custom-image-gallery .image-gallery-swipe,
  .custom-image-gallery .image-gallery-slides {
    height: 100%;
    width: 100%;
    position: relative;
  }

  .custom-image-gallery .image-gallery-slide {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
  }

  .custom-image-gallery .image-gallery-slide .image-gallery-image {
    max-height: 100%;
    max-width: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    display: block;
    margin: 0 auto;
  }

  .custom-image-gallery .image-gallery-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 4;
  }

  .custom-image-gallery .image-gallery-left-nav,
  .custom-image-gallery .image-gallery-right-nav {
    padding: 0;
    background: rgba(0, 0, 0, 0.5);
    border: none;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    margin: 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .custom-image-gallery .image-gallery-left-nav:hover,
  .custom-image-gallery .image-gallery-right-nav:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }

  .custom-image-gallery .image-gallery-left-nav {
    left: 0;
  }

  .custom-image-gallery .image-gallery-right-nav {
    right: 0;
  }

  .custom-image-gallery .image-gallery-left-nav::before,
  .custom-image-gallery .image-gallery-right-nav::before {
    content: '';
    border: solid white;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 7px;
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
    bottom: 20px;
    position: absolute;
    left: 0;
    right: 0;
    transform: none;
    z-index: 5;
    display: flex;
    justify-content: center;
    pointer-events: none;
  }

  .custom-image-gallery .image-gallery-bullets .image-gallery-bullets-container {
    display: flex;
    align-items: center;
    gap: 8px;
    pointer-events: auto;
  }

  .custom-image-gallery .image-gallery-bullet {
    border: 2px solid #fff;
    background: rgba(255, 255, 255, 0.3);
    width: 12px;
    height: 12px;
    transition: all 0.2s ease;
  }

  .custom-image-gallery .image-gallery-bullet:hover {
    background: rgba(255, 255, 255, 0.6);
  }

  .custom-image-gallery .image-gallery-bullet.active {
    background: #fff;
    transform: scale(1.2);
  }

  .custom-image-gallery .image-gallery-fullscreen-button {
    background: rgba(0, 0, 0, 0.5);
    border: none;
    border-radius: 50%;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 5;
    transition: all 0.2s ease;
  }

  .custom-image-gallery .image-gallery-fullscreen-button:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }

  .custom-image-gallery .image-gallery-fullscreen-button::before {
    content: '';
    display: block;
    width: 18px;
    height: 18px;
    border: 2px solid white;
    border-radius: 2px;
  }
`

export default function GalleryPage() {
  const [filter, setFilter] = useState('all')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const galleryRef = useRef<ImageGallery>(null)
  const cloudinaryTransform = 'f_auto,q_auto,c_fill,g_auto,w_1920,h_1280,e_upscale'
  const cloudinaryThumbTransform = 'f_auto,q_auto,c_fill,g_auto,w_800,h_533,e_upscale'

  const transformImage = (url: string, transform: string = cloudinaryTransform) =>
    url.includes('/upload/') ? url.replace('/upload/', `/upload/${transform}/`) : url

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'handrails', label: 'Handrails' },
    { id: 'docks', label: 'Docks' },
    { id: 'bridges', label: 'Pedestrian Bridges' },
    { id: 'seawalls', label: 'Seawalls' },
    { id: 'attenuators', label: 'Wave Attenuators' },
  ]

  const gallery = [
    { category: 'handrails', title: 'Main Installation', image: '/images/giralt/handrails/main_installation.jpg' },
    { category: 'handrails', title: 'Pedestrian Bridge', image: '/images/giralt/handrails/pedestrian_bridge.jpg' },
    { category: 'handrails', title: 'Griffin Road', image: '/images/giralt/handrails/griffin_road.jpg' },
    { category: 'handrails', title: 'Donald Ross Road', image: '/images/giralt/handrails/donald_ross_road.jpg' },
    { category: 'handrails', title: 'Evans Crary Bridge', image: '/images/giralt/handrails/evans_crary_bridge.jpg' },
    { category: 'docks', title: 'Lafayette Hart Park', image: '/images/giralt/docks/lafayette_hart_park.jpg' },
    { category: 'docks', title: 'Woodland Beach Fishing Pier', image: '/images/giralt/docks/woodland_beach_fishing_pier.jpg' },
    { category: 'docks', title: 'Miramar Floating Gazebo', image: '/images/giralt/docks/miramar_floating_gazebo.jpg' },
    { category: 'bridges', title: 'Long Key Natural Area', image: '/images/giralt/pedestrian_bridges/long_key_natural_area.jpg' },
    { category: 'bridges', title: 'Richardson Park Boardwalk', image: '/images/giralt/pedestrian_bridges/richardson_park_boardwalk.jpg' },
    { category: 'seawalls', title: 'Vero Beach', image: '/images/giralt/seawalls/vero_beach.jpg' },
    { category: 'seawalls', title: 'Installation Detail', image: '/images/giralt/seawalls/installation_detail.jpg' },
    { category: 'seawalls', title: 'Chula Vista Canal', image: '/images/giralt/seawalls/chula_vista_canal.jpg' },
    { category: 'attenuators', title: 'Terra Verde', image: '/images/giralt/wave_attenuators/terra_verde.jpg' },
    { category: 'attenuators', title: 'Haulover', image: '/images/giralt/wave_attenuators/haulover.jpg' },
  ]

  const filteredGallery = filter === 'all' ? gallery : gallery.filter(item => item.category === filter)

  // Convert gallery items to ImageGallery format
  const galleryImages = filteredGallery.map((item) => {
    const original = transformImage(item.image)
    // if local file, prefer a pre-generated thumbnail named like image-800.jpg
    let thumbnail = transformImage(item.image, cloudinaryThumbTransform)
    if (item.image.startsWith('/images/')) {
      thumbnail = item.image.replace(/\.jpg$/i, '-800.jpg')
    }

    return {
      original,
      thumbnail,
      originalAlt: item.title,
      thumbnailAlt: item.title,
    }
  })

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
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        loading="lazy"
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
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
            <DialogContent className="fixed inset-0 top-0 left-0 translate-x-0 translate-y-0 max-w-none sm:max-w-none w-screen h-screen m-0 p-0 overflow-hidden grid grid-rows-[1fr_auto] gap-0 border-0 rounded-none" showCloseButton={true}>
              <DialogTitle className="sr-only">
                {filteredGallery[selectedIndex]?.title || 'Image Gallery'}
              </DialogTitle>
              <div className="flex-1 bg-black overflow-hidden relative" style={{ minHeight: 0 }}>
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
                />
              </div>
              <div className="p-4 border-t bg-background shrink-0">
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
