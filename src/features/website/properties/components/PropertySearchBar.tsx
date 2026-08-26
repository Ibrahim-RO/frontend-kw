'use client'

import { useRouter } from 'next/navigation'
import { LocationAutocompleteBar } from './LocationAutocompleteBar'
import { boundsFromGeocodeResult } from '../lib/geocode-bounds'
import type { GeocodeResult } from '../api/geocode.client'

export function PropertySearchBar() {
  const router = useRouter()

  const goToResult = (result: GeocodeResult) => {
    const bounds = boundsFromGeocodeResult(result)
    const params = new URLSearchParams({
      ubicacion: result.display_name,
      n: String(bounds.TopLeft_Latitude),
      s: String(bounds.BottomRigth_Latitude),
      e: String(bounds.BottomRigth_Longitude),
      w: String(bounds.TopLeft_Longitude),
    })
    router.push(`/propiedades?${params.toString()}`)
  }

  return (
    <LocationAutocompleteBar
      size="lg"
      className="mt-10"
      formAction="/propiedades"
      onSelectResult={goToResult}
    />
  )
}
