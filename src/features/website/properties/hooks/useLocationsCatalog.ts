import { useQuery } from '@tanstack/react-query'
import { fetchLocationsCatalog } from '../api/locations.client'

export function useLocationsCatalog() {
  return useQuery({
    queryKey: ['properties-locations'],
    queryFn: fetchLocationsCatalog,
    staleTime: 60 * 60 * 1000,
  })
}
