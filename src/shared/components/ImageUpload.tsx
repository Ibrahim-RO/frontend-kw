'use client'

import { useState, type ChangeEvent } from 'react'
import { ImageIcon, LoaderCircle, Maximize2, Upload, X } from 'lucide-react'
import { toast } from 'sonner'

const input =
  'min-h-11 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15'

const labelClass = 'mb-2 block text-sm font-semibold text-foreground'

const previewBackground = {
  backgroundColor: '#f8fafc',
  backgroundImage:
    'linear-gradient(45deg, #e2e8f0 25%, transparent 25%), linear-gradient(-45deg, #e2e8f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e2e8f0 75%), linear-gradient(-45deg, transparent 75%, #e2e8f0 75%)',
  backgroundPosition: '0 0, 0 6px, 6px -6px, -6px 0px',
  backgroundSize: '12px 12px',
} as const

type ImageUploadProps = {
  label: string
  value?: string
  onChange: (value: string) => void
  endpoint: string
}

export function ImageUpload({ label, value, onChange, endpoint }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [expanded, setExpanded] = useState(false)

  async function upload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]

    e.target.value = ''

    if (!file) return

    if (file.size > 8 * 1024 * 1024) {
      return toast.error('Máximo 8 MB')
    }

    setUploading(true)

    try {
      const body = new FormData()
      body.set('image', file)

      const response = await fetch(endpoint, { method: 'POST', body })

      if (!response.ok) {
        throw new Error()
      }

      const data = await response.json()

      onChange(data.url)

      toast.success('Imagen subida')
    } catch {
      toast.error('No se pudo subir')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <span className={labelClass}>{label}</span>

      <div className="rounded-xl border-2 border-dashed border-border bg-background p-4 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {value ? (
            <button
              type="button"
              aria-label={`Ampliar ${label}`}
              title="Ver imagen en pantalla completa"
              onClick={() => setExpanded(true)}
              className="group relative flex size-24 shrink-0 cursor-zoom-in items-center justify-center overflow-hidden rounded-lg border p-2 shadow-inner ring-1 ring-black/5"
              style={previewBackground}
            >
              <img
                src={value}
                alt="Vista previa"
                className="relative z-10 max-h-full max-w-full object-contain drop-shadow-sm"
              />
              <span className="absolute inset-0 z-20 flex items-center justify-center bg-black/0 text-white opacity-0 transition group-hover:bg-black/35 group-hover:opacity-100">
                <Maximize2 className="size-6 drop-shadow" />
              </span>
            </button>
          ) : (
            <div className="flex size-24 shrink-0 items-center justify-center rounded-lg border bg-background text-muted-foreground shadow-sm">
              <ImageIcon className="size-8" />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <p className="mb-2 text-xs text-muted-foreground">JPG, PNG, WebP o GIF · máximo 8 MB</p>

            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-primary px-4 py-2.5 text-sm font-semibold text-primary shadow-sm transition hover:bg-primary/5">
              {uploading ? <LoaderCircle className="size-4 animate-spin" /> : <Upload className="size-4" />}
              {uploading ? 'Subiendo...' : 'Seleccionar imagen'}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="sr-only"
                onChange={upload}
              />
            </label>
          </div>
        </div>

        <div className="mt-4 border-t pt-4">
          <label className="mb-2 block text-xs font-medium text-muted-foreground">O introduce la URL de la imagen</label>

          <input
            className={input}
            value={value ?? ''}
            placeholder="https://... o /imagen.png"
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </div>

      {expanded && value && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Vista ampliada de ${label}`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setExpanded(false)}
        >
          <button
            type="button"
            aria-label="Cerrar vista ampliada"
            onClick={() => setExpanded(false)}
            className="absolute top-4 right-4 z-20 flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white shadow-lg transition hover:bg-white/15 sm:top-6 sm:right-6"
          >
            <X className="size-6" />
          </button>

          <div
            className="flex max-h-full max-w-full items-center justify-center overflow-hidden rounded-xl p-3 shadow-2xl sm:p-5"
            style={previewBackground}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={value}
              alt={label}
              className="max-h-[calc(100vh-4rem)] max-w-[calc(100vw-2rem)] object-contain drop-shadow-md sm:max-h-[calc(100vh-6rem)] sm:max-w-[calc(100vw-6rem)]"
            />
          </div>
        </div>
      )}
    </div>
  )
}
