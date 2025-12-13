import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: Request) {
  try {
    const jsonPath = path.resolve(process.cwd(), 'data/images.json')
    const raw = await fs.promises.readFile(jsonPath, 'utf8')
    const data = JSON.parse(raw)
    const url = new URL(request.url)
    const category = url.searchParams.get('category')
    let images = data.images || []
    if (category) {
      const cats = category.split(',')
      images = images.filter((i: any) => cats.includes(i.category))
    }
    return NextResponse.json({ images })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN || ''
  const auth = request.headers.get('authorization') || ''
  if (!ADMIN_TOKEN || auth !== `Bearer ${ADMIN_TOKEN}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { id, title, category, path: imgPath, alt } = body
    const jsonPath = path.resolve(process.cwd(), 'data/images.json')
    const raw = await fs.promises.readFile(jsonPath, 'utf8')
    const data = JSON.parse(raw)
    data.images = data.images || []
    data.images.push({ id, title, category, path: imgPath, url: imgPath, alt, dateAdded: new Date().toISOString() })
    await fs.promises.writeFile(jsonPath, JSON.stringify(data, null, 2), 'utf8')
    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 })
  }
}
import { type NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/admin-auth'
import {
  getImages,
  getImageById,
  addImage,
  updateImage,
  deleteImage,
} from '@/lib/gallery-data'

export async function GET(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const id = searchParams.get('id')

    if (id) {
      const image = getImageById(id)
      if (!image) {
        return NextResponse.json(
          { error: 'Image not found' },
          { status: 404 }
        )
      }
      return NextResponse.json(image)
    }

    let images = getImages()
    if (category) {
      images = images.filter(img => img.category === category)
    }

    return NextResponse.json(images)
  } catch (error) {
    console.error('Error fetching images:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { category, title, image } = body

    if (!category || !title || !image) {
      return NextResponse.json(
        { error: 'Category, title, and image are required' },
        { status: 400 }
      )
    }

    const newImage = await addImage({ category, title, image })
    return NextResponse.json(newImage, { status: 201 })
  } catch (error) {
    console.error('Error creating image:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Image ID is required' },
        { status: 400 }
      )
    }

    const updatedImage = await updateImage(id, updates)
    if (!updatedImage) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedImage)
  } catch (error) {
    console.error('Error updating image:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Image ID is required' },
        { status: 400 }
      )
    }

    const deleted = await deleteImage(id)
    if (!deleted) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting image:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

