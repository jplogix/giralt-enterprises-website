import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || ''

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const auth = request.headers.get('authorization') || ''
  if (!ADMIN_TOKEN || auth !== `Bearer ${ADMIN_TOKEN}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const id = params.id
    const jsonPath = path.resolve(process.cwd(), 'data/images.json')
    const raw = await fs.promises.readFile(jsonPath, 'utf8')
    const data = JSON.parse(raw)
    data.images = data.images || []
    const idx = data.images.findIndex((i: any) => i.id === id)
    if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    data.images[idx] = { ...data.images[idx], ...body }
    await fs.promises.writeFile(jsonPath, JSON.stringify(data, null, 2), 'utf8')
    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const auth = request.headers.get('authorization') || ''
  if (!ADMIN_TOKEN || auth !== `Bearer ${ADMIN_TOKEN}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const id = params.id
    const jsonPath = path.resolve(process.cwd(), 'data/images.json')
    const raw = await fs.promises.readFile(jsonPath, 'utf8')
    const data = JSON.parse(raw)
    data.images = data.images || []
    data.images = data.images.filter((i: any) => i.id !== id)
    await fs.promises.writeFile(jsonPath, JSON.stringify(data, null, 2), 'utf8')
    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 })
  }
}
