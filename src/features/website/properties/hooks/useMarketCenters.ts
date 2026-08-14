import { useQuery } from '@tanstack/react-query'
import { fetchMarketCenters } from '../api/market-centers.client'

export function useMarketCenters() {
  return useQuery({
    queryKey: ['market-centers'],
    queryFn: fetchMarketCenters,
  })
}
