'use client'

import { useEffect, useMemo, useState } from 'react'
import { haversineDistanceKm } from '../lib/geometry'
import { MARKET_CENTER_COORDINATES } from '../lib/market-center-coordinates'
import type { MarketCenter } from '../types'

type Status = 'idle' | 'locating' | 'ready' | 'unavailable'

const hasGeolocation = () => typeof navigator !== 'undefined' && 'geolocation' in navigator

// Pide la ubicación del navegador y separa el Market Center más cercano a esa
// ubicación del resto del listado (para destacarlo aparte, no solo con una
// etiqueta dentro del grid). Si el usuario no da permiso, no hay soporte de
// geolocalización, o el más cercano no tiene coordenadas conocidas, no hay
// "nearestMarketCenter" y el listado se muestra completo sin más — mismo
// criterio de "fallo silencioso" que ya usa FeaturedPropertiesSection para
// "propiedades cerca de mi ubicación".
export function useNearestMarketCenter(marketCenters: MarketCenter[]) {
  // Se calcula en el inicializador (no en un efecto) porque es una simple
  // lectura síncrona del entorno, no un side effect — evita el lint
  // react-hooks/set-state-in-effect por un setState "hueco" que solo
  // reflejaría esto mismo un instante después del mount.
  const [status, setStatus] = useState<Status>(() => (hasGeolocation() ? 'locating' : 'unavailable'))
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null)

  useEffect(() => {
    if (!hasGeolocation()) return

    let cancelled = false

    navigator.geolocation.getCurrentPosition(
      (result) => {
        if (cancelled) return
        setPosition({ lat: result.coords.latitude, lng: result.coords.longitude })
        setStatus('ready')
      },
      () => {
        if (!cancelled) setStatus('unavailable')
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 5 * 60 * 1000 },
    )

    return () => {
      cancelled = true
    }
  }, [])

  const nearest = useMemo(() => {
    if (!position) return null

    let closest: MarketCenter | null = null
    let closestDistance = Infinity

    for (const marketCenter of marketCenters) {
      const coords = MARKET_CENTER_COORDINATES[marketCenter.ID]
      if (!coords) continue

      const distance = haversineDistanceKm(position, coords)
      if (distance < closestDistance) {
        closestDistance = distance
        closest = marketCenter
      }
    }

    return closest ? { marketCenter: closest, distanceKm: closestDistance } : null
  }, [marketCenters, position])

  const otherMarketCenters = useMemo(() => {
    if (!nearest) return marketCenters
    return marketCenters.filter((mc) => mc.ID !== nearest.marketCenter.ID)
  }, [marketCenters, nearest])

  return {
    nearestMarketCenter: nearest?.marketCenter ?? null,
    nearestDistanceKm: nearest?.distanceKm ?? null,
    otherMarketCenters,
    status,
  }
}
