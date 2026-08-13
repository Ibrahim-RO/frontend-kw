import { useQuery } from '@tanstack/react-query'
import { searchProperties } from '../api/properties.client'
import { PAGE_SIZE } from '../lib/pagination'
import type { MapBounds, PropertiesFilters } from '../types'

export function usePropertiesSearch(
  bounds: MapBounds,
  filters: PropertiesFilters,
  page: number,
  enabled: boolean,
) {
  return useQuery({
    queryKey: ['properties-search', bounds, filters, page],
    queryFn: () =>
      searchProperties({ ...bounds, ...filters, Properties_Listing_Init: (page - 1) * PAGE_SIZE }),
    enabled,
  })
}
