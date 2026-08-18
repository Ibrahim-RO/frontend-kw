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

const DEGREES_PER_KM = 1 / 111

// Caja cuadrada de radioKm alrededor de un punto, usada para "propiedades
// cerca de mi ubicación" (geolocalización del navegador, no viene de
// Nominatim asi que no hay boundingbox que reutilizar).
export function boundsAroundPoint(lat: number, lon: number, radiusKm: number): MapBounds {
  const latDelta = radiusKm * DEGREES_PER_KM
  const lonDelta = (radiusKm * DEGREES_PER_KM) / Math.cos((lat * Math.PI) / 180)

  return {
    TopLeft_Latitude: lat + latDelta,
    TopLeft_Longitude: lon - lonDelta,
    BottomRigth_Latitude: lat - latDelta,
    BottomRigth_Longitude: lon + lonDelta,
  }
}
