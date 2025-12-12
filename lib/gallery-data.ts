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
const isProduction = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production'

// In-memory cache for production (read-only filesystem)
let memoryCache: GalleryData | null = null
let memoryCacheInitialized = false

export function getGalleryData(): GalleryData {
  // In production, use memory cache if available, otherwise read from file
  if (isProduction && memoryCache && memoryCacheInitialized) {
    return memoryCache
  }

  try {
    const fileContents = readFileSync(DATA_FILE_PATH, 'utf8')
    const data = JSON.parse(fileContents) as GalleryData
    
    // Cache in memory for production
    if (isProduction) {
      memoryCache = data
      memoryCacheInitialized = true
    }
    
    return data
  } catch (error) {
    console.error('Error reading gallery data:', error)
    return { categories: [], images: [] }
  }
}

export function saveGalleryData(data: GalleryData): void {
  // In production, only update memory cache (filesystem is read-only)
  // Changes will be persisted via git commit
  if (isProduction) {
    memoryCache = data
    memoryCacheInitialized = true
    return
  }

  // In development, write to file
  try {
    writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf8')
  } catch (error) {
    console.error('Error saving gallery data:', error)
    throw new Error('Failed to save gallery data')
  }
}

// Get the current data as JSON string for git commit
export function getGalleryDataAsJson(): string {
  const data = getGalleryData()
  return JSON.stringify(data, null, 2)
}

// Automatically commit changes to git (non-blocking)
async function commitToGit(message: string): Promise<boolean> {
  try {
    const githubToken = process.env.GITHUB_TOKEN
    const githubRepo = process.env.GITHUB_REPO

    // If GitHub is not configured, silently fail (operations still work)
    if (!githubToken || !githubRepo) {
      return false
    }

    const fileContent = getGalleryDataAsJson()
    const fileContentBase64 = Buffer.from(fileContent).toString('base64')

    const [owner, repo] = githubRepo.split('/')
    const filePath = 'data/gallery-data.json'

    // Get the current file SHA (if file exists)
    const getFileResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${encodeURIComponent(process.env.GITHUB_BRANCH || 'main')}`,
      {
        headers: {
          Authorization: `token ${githubToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    )

    let sha: string | undefined
    if (getFileResponse.ok) {
      const fileData = await getFileResponse.json()
      sha = fileData.sha
    } else if (getFileResponse.status !== 404) {
      // If it's not a 404 (file doesn't exist), it's a real error
      console.error('Error fetching file SHA:', await getFileResponse.text())
      return false
    }
    // If 404, sha stays undefined - we'll create a new file

    // Prepare commit body
    const commitBody: {
      message: string
      content: string
      branch: string
      sha?: string
    } = {
      message,
      content: fileContentBase64,
      branch: process.env.GITHUB_BRANCH || 'main',
    }

    // Only include sha if file exists (for updates)
    if (sha) {
      commitBody.sha = sha
    }

    // Commit the file (create new or update existing)
    const commitResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `token ${githubToken}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commitBody),
      }
    )

    return commitResponse.ok
  } catch (error) {
    console.error('Auto git commit error:', error)
    return false
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

export async function addImage(image: Omit<GalleryImage, 'id' | 'createdAt' | 'updatedAt'>): Promise<GalleryImage> {
  const data = getGalleryData()
  const newImage: GalleryImage = {
    ...image,
    id: generateImageId(image.category, image.title),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  data.images.push(newImage)
  saveGalleryData(data)
  
  // Automatically commit to git (non-blocking)
  await commitToGit(`Add image: ${image.title}`).catch(() => {
    // Silently fail - operation still succeeds
  })
  
  return newImage
}

export async function updateImage(id: string, updates: Partial<Omit<GalleryImage, 'id' | 'createdAt'>>): Promise<GalleryImage | null> {
  const data = getGalleryData()
  const index = data.images.findIndex(img => img.id === id)
  if (index === -1) return null

  const imageTitle = data.images[index].title
  data.images[index] = {
    ...data.images[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  saveGalleryData(data)
  
  // Automatically commit to git (non-blocking)
  await commitToGit(`Update image: ${imageTitle}`).catch(() => {
    // Silently fail - operation still succeeds
  })
  
  return data.images[index]
}

export async function deleteImage(id: string): Promise<boolean> {
  const data = getGalleryData()
  const index = data.images.findIndex(img => img.id === id)
  if (index === -1) return false

  const imageTitle = data.images[index].title
  data.images.splice(index, 1)
  saveGalleryData(data)
  
  // Automatically commit to git (non-blocking)
  await commitToGit(`Delete image: ${imageTitle}`).catch(() => {
    // Silently fail - operation still succeeds
  })
  
  return true
}

export async function addCategory(category: GalleryCategory): Promise<GalleryCategory> {
  const data = getGalleryData()
  // Check if category already exists
  if (data.categories.find(cat => cat.id === category.id)) {
    throw new Error('Category already exists')
  }
  data.categories.push(category)
  saveGalleryData(data)
  
  // Automatically commit to git (non-blocking)
  await commitToGit(`Add category: ${category.label}`).catch(() => {
    // Silently fail - operation still succeeds
  })
  
  return category
}

export async function updateCategory(id: string, updates: Partial<Omit<GalleryCategory, 'id'>>): Promise<GalleryCategory | null> {
  const data = getGalleryData()
  const index = data.categories.findIndex(cat => cat.id === id)
  if (index === -1) return null

  const categoryLabel = data.categories[index].label
  data.categories[index] = {
    ...data.categories[index],
    ...updates,
  }
  saveGalleryData(data)
  
  // Automatically commit to git (non-blocking)
  await commitToGit(`Update category: ${categoryLabel}`).catch(() => {
    // Silently fail - operation still succeeds
  })
  
  return data.categories[index]
}

export async function deleteCategory(id: string): Promise<boolean> {
  const data = getGalleryData()
  // Don't allow deleting category if images are using it
  const imagesUsingCategory = data.images.filter(img => img.category === id)
  if (imagesUsingCategory.length > 0) {
    throw new Error('Cannot delete category with existing images')
  }

  const index = data.categories.findIndex(cat => cat.id === id)
  if (index === -1) return false

  const categoryLabel = data.categories[index].label
  data.categories.splice(index, 1)
  saveGalleryData(data)
  
  // Automatically commit to git (non-blocking)
  await commitToGit(`Delete category: ${categoryLabel}`).catch(() => {
    // Silently fail - operation still succeeds
  })
  
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

