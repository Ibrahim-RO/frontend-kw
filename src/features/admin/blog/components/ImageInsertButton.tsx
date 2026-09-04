'use client'

import { useState, type ChangeEvent, type KeyboardEvent } from 'react'
import { Popover } from '@base-ui/react/popover'
import { ImageIcon, LoaderCircle, Upload } from 'lucide-react'
import { toast } from 'sonner'
import type { Editor } from '@tiptap/react'

export function ImageInsertButton({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState('')
  const [uploading, setUploading] = useState(false)

  const insert = (src: string) => {
    if (!src.trim()) return
    editor.chain().focus().setImage({ src: src.trim() }).run()
    setUrl('')
    setOpen(false)
  }

  const upload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return

    if (file.size > 8 * 1024 * 1024) {
      toast.error('Máximo 8 MB')
      return
    }

    setUploading(true)
    try {
      const body = new FormData()
      body.set('image', file)
      const response = await fetch('/api/admin/blog/images', { method: 'POST', body })
      if (!response.ok) throw new Error()
      const data = await response.json()
      insert(data.url)
      toast.success('Imagen insertada')
    } catch {
      toast.error('No se pudo subir la imagen')
    } finally {
      setUploading(false)
    }
  }

  const handleUrlKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      insert(url)
    }
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        aria-label="Insertar imagen"
      >
        <ImageIcon className="size-4" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner sideOffset={8} align="start">
          <Popover.Popup className="w-72 rounded-lg border border-border bg-card p-4 text-card-foreground shadow-lg outline-none">
            <p className="mb-3 text-sm font-semibold">Insertar imagen</p>

            <label className="mb-3 flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-input py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/5">
              {uploading ? <LoaderCircle className="size-4 animate-spin" /> : <Upload className="size-4" />}
              {uploading ? 'Subiendo...' : 'Subir desde tu equipo'}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="sr-only"
                onChange={upload}
              />
            </label>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={handleUrlKeyDown}
                placeholder="O pega una URL"
                className="min-h-9 flex-1 rounded-md border border-input bg-background px-2.5 text-sm outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={() => insert(url)}
                className="shrink-0 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Insertar
              </button>
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  )
}
