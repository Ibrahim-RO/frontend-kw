import type { GeocodeResult } from '../api/geocode.client'
import type { MapBounds } from '../types'

// Tamaño mínimo del área a mostrar (~3km) para que un resultado muy preciso
// (ej. una calle exacta) no deje el mapa centrado en un cuadro casi invisible.
const MIN_SPAN = 0.03

export function boundsFromGeocodeResult(result: GeocodeResult): MapBounds {
  const [south, north, west, east] = result.boundingbox.map(Number)
  const centerLat = (south + north) / 2
  const centerLon = (west + east) / 2
  const latSpan = Math.max(north - south, MIN_SPAN)
  const lonSpan = Math.max(east - west, MIN_SPAN)

  return {
    TopLeft_Latitude: centerLat + latSpan / 2,
    TopLeft_Longitude: centerLon - lonSpan / 2,
    BottomRigth_Latitude: centerLat - latSpan / 2,
    BottomRigth_Longitude: centerLon + lonSpan / 2,
  }
}
