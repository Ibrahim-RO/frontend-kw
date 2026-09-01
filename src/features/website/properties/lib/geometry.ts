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
