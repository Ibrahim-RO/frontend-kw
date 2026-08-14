import { useQuery } from '@tanstack/react-query'
import { fetchProperties } from '../api/properties.client'
import { getBackendOffset } from '../lib/pagination'

export function useProperties(page: number) {
  const offset = getBackendOffset(page)
  return useQuery({
    queryKey: ['properties', offset],
    queryFn: () => fetchProperties(offset),
  })
}
