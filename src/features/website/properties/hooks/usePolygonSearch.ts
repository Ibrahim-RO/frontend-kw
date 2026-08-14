import { useQuery } from '@tanstack/react-query'
import { searchProperties } from '../api/properties.client'
import { BACKEND_PAGE_SIZE } from '../lib/pagination'
import { getPolygonBounds, isPointInPolygon, type LatLngPoint } from '../lib/geometry'
import type { PropertiesFilters } from '../types'

// Tope de propiedades a traer del backend para filtrar por polígono en el
// cliente. El backend solo filtra por rectángulo, así que traemos el
// rectángulo que envuelve al polígono (paginado) y descartamos lo que
// quede fuera del área dibujada. Si el área tiene más que esto, se avisa
// al usuario que dibuje una zona más chica para resultados completos.
export const MAX_POLYGON_PROPERTIES = 300

export function usePolygonSearch(polygon: LatLngPoint[] | null, filters: PropertiesFilters) {
  return useQuery({
    queryKey: ['properties-polygon', polygon, filters],
    queryFn: async () => {
      const bounds = getPolygonBounds(polygon!)
      const first = await searchProperties({ ...bounds, ...filters, Properties_Listing_Init: 0 })
      const total = first.data.Total_Properties
      const fetchTotal = Math.min(total, MAX_POLYGON_PROPERTIES)
      const remainingPages = Math.max(0, Math.ceil(fetchTotal / BACKEND_PAGE_SIZE) - 1)

      const rest = await Promise.all(
        Array.from({ length: remainingPages }, (_, index) =>
          searchProperties({ ...bounds, ...filters, Properties_Listing_Init: (index + 1) * BACKEND_PAGE_SIZE }),
        ),
      )

      const allProperties = [first, ...rest].flatMap((response) => response.data.Properties_Data)
      const properties = allProperties.filter(
        (property) =>
          property.Latitude &&
          property.Longitude &&
          isPointInPolygon({ lat: property.Latitude, lng: property.Longitude }, polygon!),
      )

      return { properties, truncated: total > MAX_POLYGON_PROPERTIES }
    },
    enabled: polygon !== null && polygon.length >= 3,
  })
}
