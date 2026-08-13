import { useQuery } from '@tanstack/react-query'
import { fetchPropertyDetail } from '../api/properties.client'

export function useProperty(id: number | string) {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => fetchPropertyDetail(id),
  })
}
