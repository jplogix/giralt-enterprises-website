import { type NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import { isAuthenticated } from '@/lib/admin-auth'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export async function POST(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const category = formData.get('category') as string

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    if (!category) {
      return NextResponse.json(
        { error: 'Category is required' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      )
    }

    // Generate safe filename
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filename = `${timestamp}_${originalName}`

    // Determine upload path based on category
    const categoryPath = category.replace(/-/g, '_')
    const isProduction = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production'
    
    if (isProduction) {
      // In production (Vercel), we can't write to filesystem
      // Images need to be uploaded via git commit or cloud storage
      // For now, return a path that will be committed via git
      // The actual file will need to be committed separately
      const publicPath = `/images/giralt/${categoryPath}/${filename}`
      
      return NextResponse.json({
        success: true,
        path: publicPath,
        filename,
        note: 'In production, images must be uploaded via git. Please commit the image file to the repository and then add it to the gallery.',
      })
    } else {
      // In development, write to local filesystem
      const uploadDir = join(process.cwd(), 'public', 'images', 'giralt', categoryPath)

      // Create directory if it doesn't exist
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true })
      }

      const filePath = join(uploadDir, filename)
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      await writeFile(filePath, buffer)

      // Return the public URL path
      const publicPath = `/images/giralt/${categoryPath}/${filename}`

      return NextResponse.json({
        success: true,
        path: publicPath,
        filename,
      })
    }
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}

