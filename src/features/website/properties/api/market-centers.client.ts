import axios from 'axios'
import type {
  MarketCenterAgentsResponse,
  MarketCenterDetailResponse,
  MarketCentersListResponse,
} from '../types'

const marketCentersClient = axios.create({ baseURL: '/api/market-centers' })

export async function fetchMarketCenters() {
  const { data } = await marketCentersClient.get<MarketCentersListResponse>('')
  return data
}

export async function fetchMarketCenter(id: number | string) {
  const { data } = await marketCentersClient.get<MarketCenterDetailResponse>(`/${id}`)
  return data
}

export async function fetchMarketCenterAgents(id: number | string, offset: number) {
  const { data } = await marketCentersClient.get<MarketCenterAgentsResponse>(`/${id}/agents`, {
    params: { offset },
  })
  return data
}
