import 'server-only'

import { marketCenterAgentsApi, marketCentersApi } from '@/src/shared/lib/market-centers-api'

export async function listMarketCenters() {
  const { data } = await marketCentersApi.get('/All_Market_Centers_Info')
  return data
}

export async function getMarketCenter(id: string) {
  const { data } = await marketCentersApi.get('/Single_Market_Center_Info', {
    params: { MarketCenterID: id },
  })
  return data
}

export async function listMarketCenterAgents(id: string, offset: number) {
  const { data } = await marketCenterAgentsApi.get('/Market_Center_Listed_Agents_Info', {
    params: { Market_Center_ID: id, Agents_Listing_Offset: offset },
  })
  return data
}
