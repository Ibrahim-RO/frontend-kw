'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { searchProperties } from '@/src/features/website/properties/api/properties.client'
import { boundsAroundPoint } from '@/src/features/website/properties/lib/geocode-bounds'
import { pickRandom } from '@/src/features/website/properties/lib/random'
import { emptyFilters, type Property } from '@/src/features/website/properties/types'
import { NearbyPropertyCard } from './NearbyPropertyCard'

// Radios crecientes (km): si el radio chico no tiene nada cerca, probamos
// uno mas grande antes de rendirnos, para no dejar sin contenido a alguien
// en una zona con poca cobertura.
const RADIUS_STEPS_KM = [20, 75, 250]
const FEATURED_COUNT = 8
const SCROLL_STEP_PX = 300

type Status = 'idle' | 'locating' | 'ready' | 'unavailable'

export default function FeaturedPropertiesSection() {
  const [status, setStatus] = useState<Status>('idle')
  const [properties, setProperties] = useState<Property[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setStatus('unavailable')
      return
    }

    let cancelled = false
    setStatus('locating')

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords

        for (const radiusKm of RADIUS_STEPS_KM) {
          if (cancelled) return
          const bounds = boundsAroundPoint(latitude, longitude, radiusKm)
          try {
            const result = await searchProperties({ ...bounds, ...emptyFilters, Properties_Listing_Init: 0 })
            const found = result.data.Properties_Data
            if (found.length > 0) {
              if (!cancelled) {
                setProperties(pickRandom(found, FEATURED_COUNT))
                setStatus('ready')
              }
              return
            }
          } catch {
            // probamos el siguiente radio; si todos fallan, cae a "unavailable" abajo
          }
        }

        if (!cancelled) setStatus('unavailable')
      },
      () => {
        if (!cancelled) setStatus('unavailable')
      },
      { timeout: 8000, maximumAge: 5 * 60 * 1000 },
    )

    return () => {
      cancelled = true
    }
  }, [])

  const scrollByStep = (direction: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: direction * SCROLL_STEP_PX, behavior: 'smooth' })
  }

  if (status !== 'ready') return null

  return (
    <section className="bg-neutral-50 py-20 sm:py-24 lg:py-28" aria-labelledby="featured-properties-title">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2
          id="featured-properties-title"
          className="mb-8 font-heading text-3xl font-bold text-kw-secondary sm:text-4xl"
        >
          Propiedades cerca de ti
        </h2>

        <div className="relative">
          <button
            type="button"
            onClick={() => scrollByStep(-1)}
            className="absolute top-1/2 left-0 z-10 hidden size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-kw-primary bg-white text-kw-primary shadow-md transition-colors hover:bg-kw-primary hover:text-white sm:flex"
            aria-label="Ver propiedades anteriores"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            ref={scrollRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {properties.map((property) => (
              <NearbyPropertyCard key={property.ID} property={property} />
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollByStep(1)}
            className="absolute top-1/2 right-0 z-10 hidden size-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-kw-primary bg-white text-kw-primary shadow-md transition-colors hover:bg-kw-primary hover:text-white sm:flex"
            aria-label="Ver más propiedades"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="mt-4 text-right">
          <Link href="/propiedades" className="text-sm font-bold text-kw-primary hover:text-kw-secondary">
            Ver más...
          </Link>
        </div>
      </div>
    </section>
  )
}
