'use client'

import { useState } from 'react'

export default function UploadClient({ onUploaded }: any) {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('docks')
  const [alt, setAlt] = useState('')
  const [loading, setLoading] = useState(false)

  const readFileAsBase64 = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      const base = result.split(',')[1]
      resolve(base)
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    try {
      const base = await readFileAsBase64(file)
      const res = await fetch('/api/admin/uploads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN || ''}`
        },
        body: JSON.stringify({ filename: file.name, contentBase64: base, category, title, alt })
      })
      const json = await res.json()
      setLoading(false)
      if (json.ok || json.path) {
        setFile(null)
        setTitle('')
        setAlt('')
        onUploaded && onUploaded(json)
      } else {
        alert(json.error || 'Upload failed')
      }
    } catch (err: any) {
      setLoading(false)
      alert(err.message || String(err))
    }
  }

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm">File</label>
        <input type="file" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
      </div>
      <div>
        <label className="block text-sm">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border p-2" />
      </div>
      <div>
        <label className="block text-sm">Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border p-2">
          <option value="docks">Docks</option>
          <option value="gangways">Gangways</option>
          <option value="handrails">Handrails</option>
          <option value="seawalls">Seawalls</option>
        </select>
      </div>
      <div>
        <label className="block text-sm">Alt</label>
        <input value={alt} onChange={(e) => setAlt(e.target.value)} className="w-full border p-2" />
      </div>
      <div>
        <button onClick={handleUpload} disabled={loading} className="btn btn-primary">
          {loading ? 'Uploading…' : 'Upload'}
        </button>
      </div>
    </div>
  )
}
