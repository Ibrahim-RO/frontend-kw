import { useQuery } from '@tanstack/react-query'
import { fetchProperties } from '../api/properties.client'
import { PAGE_SIZE } from '../lib/pagination'

export function useProperties(page: number) {
  return useQuery({
    queryKey: ['properties', page],
    queryFn: () => fetchProperties((page - 1) * PAGE_SIZE),
  })
}
