import { useQuery } from '@tanstack/react-query'
import { searchProperties } from '../api/properties.client'
import { getBackendOffset } from '../lib/pagination'
import type { MapBounds, PropertiesFilters } from '../types'

export function usePropertiesSearch(
  bounds: MapBounds,
  filters: PropertiesFilters,
  page: number,
  enabled: boolean,
) {
  const offset = getBackendOffset(page)
  return useQuery({
    queryKey: ['properties-search', bounds, filters, offset],
    queryFn: () => searchProperties({ ...bounds, ...filters, Properties_Listing_Init: offset }),
    enabled,
  })
}
