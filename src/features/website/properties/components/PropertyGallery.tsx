'use client'

import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Property, PropertyPhoto } from '../types'

type PropertyGalleryProps = {
  property: Property
  photos: PropertyPhoto[]
}

export function PropertyGallery({ property, photos }: PropertyGalleryProps) {
  const images = photos.length > 0 ? photos.map((photo) => photo.Photo_URL) : property.Photo_URL ? [property.Photo_URL] : []
  const [selected, setSelected] = useState(0)
  const thumbsRef = useRef<HTMLDivElement>(null)

  if (images.length === 0) {
    return (
      <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-100 text-sm text-kw-tertiary">
        Sin fotos disponibles
      </div>
    )
  }

  const scrollThumbs = (direction: 1 | -1) => {
    thumbsRef.current?.scrollBy({ left: direction * 160, behavior: 'smooth' })
  }

  return (
    <div className="w-full min-w-0">
      <div className="mb-3.5 aspect-[4/3] w-full overflow-hidden rounded-2xl">
        <img src={images[selected]} alt={property.Title} className="h-full w-full object-cover" />
      </div>

      {images.length > 1 && (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollThumbs(-1)}
            aria-label="Foto anterior"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-kw-primary text-white transition-colors hover:bg-kw-secondary"
          >
            <ChevronLeft size={16} />
          </button>

          <div
            ref={thumbsRef}
            className="flex min-w-0 flex-1 gap-2 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {images.map((url, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelected(index)}
                aria-label={`Ver foto ${index + 1}`}
                className={`h-14 w-14 shrink-0 rounded-lg bg-cover bg-center border-2 transition-all ${
                  index === selected ? 'border-kw-primary opacity-100' : 'border-transparent opacity-65 hover:opacity-90'
                }`}
                style={{ backgroundImage: `url(${url})` }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollThumbs(1)}
            aria-label="Siguiente foto"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-kw-primary text-white transition-colors hover:bg-kw-secondary"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  )
}
