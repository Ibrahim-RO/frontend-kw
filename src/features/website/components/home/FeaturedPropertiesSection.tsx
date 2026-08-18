'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { searchProperties } from '@/src/features/website/properties/api/properties.client'
import { boundsAroundPoint } from '@/src/features/website/properties/lib/geocode-bounds'
import { pickRandom } from '@/src/features/website/properties/lib/random'
import { PropertyCard } from '@/src/features/website/properties/components/PropertyCard'
import { emptyFilters, type Property } from '@/src/features/website/properties/types'

// Radios crecientes (km): si el radio chico no tiene nada cerca, probamos
// uno mas grande antes de rendirnos, para no dejar sin contenido a alguien
// en una zona con poca cobertura.
const RADIUS_STEPS_KM = [20, 75, 250]
const FEATURED_COUNT = 4

type Status = 'idle' | 'locating' | 'ready' | 'unavailable'

export default function FeaturedPropertiesSection() {
  const [status, setStatus] = useState<Status>('idle')
  const [properties, setProperties] = useState<Property[]>([])

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

  if (status !== 'ready') return null

  return (
    <section className="bg-neutral-50 py-20 sm:py-24 lg:py-28" aria-labelledby="featured-properties-title">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="featured-properties-title"
              className="font-heading text-4xl font-extrabold tracking-tight text-kw-secondary sm:text-5xl"
            >
              Propiedades <span className="text-kw-primary">destacadas</span>
            </h2>
            <p className="mt-3 text-lg text-kw-tertiary">Seleccionadas para ti cerca de tu ubicación.</p>
          </div>
          <Link
            href="/propiedades"
            className="shrink-0 text-sm font-bold tracking-wide text-kw-primary uppercase hover:text-kw-secondary"
          >
            Ver todas las propiedades →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {properties.map((property) => (
            <PropertyCard key={property.ID} property={property} />
          ))}
        </div>
      </div>
    </section>
  )
}
