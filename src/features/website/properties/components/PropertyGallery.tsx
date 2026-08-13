'use client'

import { useState } from 'react'
import type { Property, PropertyPhoto } from '../types'
import { getOperationLabel } from '../lib/property-options'

type PropertyGalleryProps = {
  property: Property
  photos: PropertyPhoto[]
}

export function PropertyGallery({ property, photos }: PropertyGalleryProps) {
  const images = photos.length > 0 ? photos.map((photo) => photo.Photo_URL) : property.Photo_URL ? [property.Photo_URL] : []
  const [selected, setSelected] = useState(0)

  if (images.length === 0) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-3xl border border-neutral-200 bg-neutral-100 text-kw-tertiary md:h-[500px]">
        Sin fotos disponibles
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative h-[400px] overflow-hidden rounded-3xl border border-neutral-200 shadow-xl md:h-[500px]">
        <img
          src={images[selected]}
          alt={property.Title}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-4 right-4 rounded-full bg-kw-primary px-4 py-1.5 text-sm font-bold text-white shadow-md">
          {getOperationLabel(property.Property_Operation_ID)}
        </div>
      </div>

      {images.length > 1 && (
        <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-2">
          {images.map((url, index) => (
            <button
              key={url}
              type="button"
              onClick={() => setSelected(index)}
              className={`h-24 w-32 shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${
                index === selected ? 'border-kw-primary' : 'border-transparent hover:border-neutral-300'
              }`}
            >
              <img src={url} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
