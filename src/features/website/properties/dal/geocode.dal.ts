import 'server-only'

import { geocodingApi } from '@/src/shared/lib/geocoding-api'

export type GeocodeQuery = {
  street?: string
  city?: string
  state?: string
  postalcode?: string
}

export async function geocodeLocation(query: GeocodeQuery) {
  const { data } = await geocodingApi.get('/search', {
    params: {
      format: 'jsonv2',
      country: 'Mexico',
      limit: 1,
      ...query,
    },
  })
  return data
}
