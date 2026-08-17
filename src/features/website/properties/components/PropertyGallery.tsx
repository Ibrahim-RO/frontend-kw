'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import type { Property, PropertyPhoto } from '../types'

type PropertyGalleryProps = {
  property: Property
  photos: PropertyPhoto[]
}

export function PropertyGallery({ property, photos }: PropertyGalleryProps) {
  const images = photos.length > 0 ? photos.map((photo) => photo.Photo_URL) : property.Photo_URL ? [property.Photo_URL] : []
  const [selected, setSelected] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const thumbsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isExpanded) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsExpanded(false)
      if (event.key === 'ArrowLeft') setSelected((current) => (current - 1 + images.length) % images.length)
      if (event.key === 'ArrowRight') setSelected((current) => (current + 1) % images.length)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [images.length, isExpanded])

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
      <button
        type="button"
        onClick={() => setIsExpanded(true)}
        className="group relative mb-4 block aspect-[16/9] w-full cursor-zoom-in overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 shadow-sm"
        aria-label="Ampliar fotografía"
      >
        <img src={images[selected]} alt={property.Title} className="h-full w-full object-cover" />
        <span className="absolute right-4 bottom-4 flex items-center gap-2 rounded-full bg-black/65 px-3.5 py-2 text-xs font-bold text-white opacity-100 backdrop-blur-sm transition-opacity md:opacity-0 md:group-hover:opacity-100">
          <Maximize2 size={15} /> Ver pantalla completa
        </span>
      </button>

      {images.length > 1 && (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => scrollThumbs(-1)}
            aria-label="Foto anterior"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-kw-primary shadow-sm transition-colors hover:bg-kw-primary hover:text-white"
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
                className={`h-16 w-24 shrink-0 rounded-xl bg-cover bg-center border-2 transition-all ${
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
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-kw-primary shadow-sm transition-colors hover:bg-kw-primary hover:text-white"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {isExpanded && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Galería de ${property.Title}`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10"
          onClick={(event) => {
            if (event.target === event.currentTarget) setIsExpanded(false)
          }}
        >
          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            className="absolute top-5 right-5 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-kw-primary"
            aria-label="Cerrar galería"
            autoFocus
          >
            <X size={25} />
          </button>

          {images.length > 1 && (
            <button
              type="button"
              onClick={() => setSelected((current) => (current - 1 + images.length) % images.length)}
              className="absolute left-3 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-kw-primary md:left-6 md:size-12"
              aria-label="Fotografía anterior"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          <img
            src={images[selected]}
            alt={`${property.Title}, fotografía ${selected + 1}`}
            className="max-h-[88vh] max-w-[92vw] object-contain"
          />

          {images.length > 1 && (
            <button
              type="button"
              onClick={() => setSelected((current) => (current + 1) % images.length)}
              className="absolute right-3 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-kw-primary md:right-6 md:size-12"
              aria-label="Siguiente fotografía"
            >
              <ChevronRight size={28} />
            </button>
          )}

          <span className="absolute bottom-5 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white">
            {selected + 1} / {images.length}
          </span>
        </div>
      )}
    </div>
  )
}
