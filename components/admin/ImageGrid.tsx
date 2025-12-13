import Image from 'next/image'

export function ImageGrid({ images = [], onEdit, onDelete }: any) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {images.map((img: any) => (
        <div key={img.id} className="border rounded overflow-hidden">
          <div className="relative h-40">
            <Image src={img.url || img.path} alt={img.alt || img.title} fill className="object-cover" />
          </div>
          <div className="p-2 text-sm">
            <div className="font-semibold truncate">{img.title}</div>
            <div className="text-muted-foreground text-xs">{img.category}</div>
            <div className="flex gap-2 mt-2">
              <button onClick={() => onEdit(img)} className="text-sm text-primary">Edit</button>
              <button onClick={() => onDelete(img)} className="text-sm text-destructive">Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ImageGrid
