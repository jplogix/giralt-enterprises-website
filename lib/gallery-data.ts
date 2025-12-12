import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

export interface GalleryCategory {
  id: string
  label: string
}

export interface GalleryImage {
  id: string
  category: string
  title: string
  image: string
  createdAt: string
  updatedAt: string
}

export interface GalleryData {
  categories: GalleryCategory[]
  images: GalleryImage[]
}

const DATA_FILE_PATH = join(process.cwd(), 'data', 'gallery-data.json')

export function getGalleryData(): GalleryData {
  try {
    const fileContents = readFileSync(DATA_FILE_PATH, 'utf8')
    return JSON.parse(fileContents) as GalleryData
  } catch (error) {
    console.error('Error reading gallery data:', error)
    return { categories: [], images: [] }
  }
}

export function saveGalleryData(data: GalleryData): void {
  try {
    writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf8')
  } catch (error) {
    console.error('Error saving gallery data:', error)
    throw new Error('Failed to save gallery data')
  }
}

export function getCategories(): GalleryCategory[] {
  const data = getGalleryData()
  return data.categories
}

export function getImages(): GalleryImage[] {
  const data = getGalleryData()
  return data.images
}

export function getImageById(id: string): GalleryImage | undefined {
  const images = getImages()
  return images.find(img => img.id === id)
}

export function getImagesByCategory(categoryId: string): GalleryImage[] {
  const images = getImages()
  return images.filter(img => img.category === categoryId)
}

export function addImage(image: Omit<GalleryImage, 'id' | 'createdAt' | 'updatedAt'>): GalleryImage {
  const data = getGalleryData()
  const newImage: GalleryImage = {
    ...image,
    id: generateImageId(image.category, image.title),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  data.images.push(newImage)
  saveGalleryData(data)
  return newImage
}

export function updateImage(id: string, updates: Partial<Omit<GalleryImage, 'id' | 'createdAt'>>): GalleryImage | null {
  const data = getGalleryData()
  const index = data.images.findIndex(img => img.id === id)
  if (index === -1) return null

  data.images[index] = {
    ...data.images[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  saveGalleryData(data)
  return data.images[index]
}

export function deleteImage(id: string): boolean {
  const data = getGalleryData()
  const index = data.images.findIndex(img => img.id === id)
  if (index === -1) return false

  data.images.splice(index, 1)
  saveGalleryData(data)
  return true
}

export function addCategory(category: GalleryCategory): GalleryCategory {
  const data = getGalleryData()
  // Check if category already exists
  if (data.categories.find(cat => cat.id === category.id)) {
    throw new Error('Category already exists')
  }
  data.categories.push(category)
  saveGalleryData(data)
  return category
}

export function updateCategory(id: string, updates: Partial<Omit<GalleryCategory, 'id'>>): GalleryCategory | null {
  const data = getGalleryData()
  const index = data.categories.findIndex(cat => cat.id === id)
  if (index === -1) return null

  data.categories[index] = {
    ...data.categories[index],
    ...updates,
  }
  saveGalleryData(data)
  return data.categories[index]
}

export function deleteCategory(id: string): boolean {
  const data = getGalleryData()
  // Don't allow deleting category if images are using it
  const imagesUsingCategory = data.images.filter(img => img.category === id)
  if (imagesUsingCategory.length > 0) {
    throw new Error('Cannot delete category with existing images')
  }

  const index = data.categories.findIndex(cat => cat.id === id)
  if (index === -1) return false

  data.categories.splice(index, 1)
  saveGalleryData(data)
  return true
}

function generateImageId(category: string, title: string): string {
  const baseId = `${category}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`
  let id = baseId
  let counter = 1
  const images = getImages()
  
  while (images.find(img => img.id === id)) {
    id = `${baseId}-${counter}`
    counter++
  }
  
  return id
}

