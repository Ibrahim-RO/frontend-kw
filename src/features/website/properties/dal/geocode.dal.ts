import 'server-only'

import { geocodingApi } from '@/src/shared/lib/geocoding-api'

export type GeocodeQuery = {
  street?: string
  city?: string
  state?: string
  postalcode?: string
  // Búsqueda libre (autocomplete). Si viene, se ignoran los campos
  // estructurados de arriba — Nominatim no permite mezclar "q" con
  // street/city/state en la misma búsqueda.
  q?: string
  limit?: number
}

export async function geocodeLocation({ q, limit, ...structured }: GeocodeQuery) {
  const { data } = await geocodingApi.get('/search', {
    params: q
      ? { format: 'jsonv2', countrycodes: 'mx', limit: limit ?? 1, q }
      : { format: 'jsonv2', country: 'Mexico', limit: limit ?? 1, ...structured },
  })
  return data
}
