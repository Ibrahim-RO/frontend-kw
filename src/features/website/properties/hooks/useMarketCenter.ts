import { useQuery } from '@tanstack/react-query'
import { fetchMarketCenter } from '../api/market-centers.client'

export function useMarketCenter(id: number | string) {
  return useQuery({
    queryKey: ['market-center', id],
    queryFn: () => fetchMarketCenter(id),
  })
}
