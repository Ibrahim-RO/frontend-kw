import { useQuery } from '@tanstack/react-query'
import { fetchMarketCenterAgents } from '../api/market-centers.client'

export const AGENTS_PAGE_SIZE = 24

export function useMarketCenterAgents(id: number | string, page: number) {
  const offset = (page - 1) * AGENTS_PAGE_SIZE
  return useQuery({
    queryKey: ['market-center-agents', id, offset],
    queryFn: () => fetchMarketCenterAgents(id, offset),
  })
}
