import type { MapBounds } from '../types'

export type LatLngPoint = { lat: number; lng: number }

export function isPointInPolygon(point: LatLngPoint, polygon: LatLngPoint[]): boolean {
  let inside = false

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].lng
    const yi = polygon[i].lat
    const xj = polygon[j].lng
    const yj = polygon[j].lat

    const intersect =
      yi > point.lat !== yj > point.lat &&
      point.lng < ((xj - xi) * (point.lat - yi)) / (yj - yi) + xi

    if (intersect) inside = !inside
  }

  return inside
}

export function getPolygonBounds(polygon: LatLngPoint[]): MapBounds {
  const lats = polygon.map((p) => p.lat)
  const lngs = polygon.map((p) => p.lng)

  return {
    TopLeft_Latitude: Math.max(...lats),
    TopLeft_Longitude: Math.min(...lngs),
    BottomRigth_Latitude: Math.min(...lats),
    BottomRigth_Longitude: Math.max(...lngs),
  }
}

const EARTH_RADIUS_KM = 6371

// Distancia en línea recta entre dos puntos (fórmula de Haversine). Se usa
// para encontrar el Market Center más cercano a la ubicación del usuario.
export function haversineDistanceKm(a: LatLngPoint, b: LatLngPoint): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)

  const sinLat = Math.sin(dLat / 2)
  const sinLng = Math.sin(dLng / 2)
  const h = sinLat * sinLat + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * sinLng * sinLng

  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h))
}
