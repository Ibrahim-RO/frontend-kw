import axios from 'axios'

const geocodeClient = axios.create({ baseURL: '/api/geocode' })

export type GeocodeResult = {
  lat: string
  lon: string
  display_name: string
  boundingbox: [string, string, string, string]
}

export type GeocodeAddressQuery = {
  street?: string | null
  city?: string | null
  state?: string | null
  postalcode?: string | null
}

export async function geocodeAddress(query: GeocodeAddressQuery) {
  const { data } = await geocodeClient.get<GeocodeResult[]>('', {
    params: {
      street: query.street || undefined,
      city: query.city || undefined,
      state: query.state || undefined,
      postalcode: query.postalcode || undefined,
    },
  })
  return data[0] ?? null
}

export async function searchLocationSuggestions(query: string) {
  const { data } = await geocodeClient.get<GeocodeResult[]>('', {
    params: { q: query, limit: 5 },
  })
  return data
}
