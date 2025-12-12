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
      // In production (Vercel), commit image file to git automatically
      const githubToken = process.env.GITHUB_TOKEN
      const githubRepo = process.env.GITHUB_REPO

      if (!githubToken || !githubRepo) {
        return NextResponse.json(
          { 
            error: 'GitHub integration not configured. Please set GITHUB_TOKEN and GITHUB_REPO environment variables to upload images.',
            configured: false
          },
          { status: 400 }
        )
      }

      // Read file as base64
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const fileContentBase64 = buffer.toString('base64')

      const [owner, repo] = githubRepo.split('/')
      const filePath = `public/images/giralt/${categoryPath}/${filename}`

      // Check if file already exists
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
        const errorText = await getFileResponse.text()
        console.error('Error checking file:', errorText)
        return NextResponse.json(
          { error: 'Failed to check file in repository' },
          { status: getFileResponse.status }
        )
      }

      // Commit the image file to git
      const commitBody: {
        message: string
        content: string
        branch: string
        sha?: string
      } = {
        message: `Add image: ${filename}`,
        content: fileContentBase64,
        branch: process.env.GITHUB_BRANCH || 'main',
      }

      if (sha) {
        commitBody.sha = sha
      }

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

      if (!commitResponse.ok) {
        const error = await commitResponse.json()
        console.error('GitHub API error:', error)
        return NextResponse.json(
          { error: error.message || 'Failed to commit image to GitHub' },
          { status: commitResponse.status }
        )
      }

      // Return the public URL path
      const publicPath = `/images/giralt/${categoryPath}/${filename}`
      
      return NextResponse.json({
        success: true,
        path: publicPath,
        filename,
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

