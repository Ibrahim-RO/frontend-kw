import 'server-only'

import { marketCenterAgentsApi } from '@/src/shared/lib/market-centers-api'

export async function getAgent(agentId: number | string) {
  const { data } = await marketCenterAgentsApi.get('/Single_Agent_Info', {
    params: { Agent_ID: agentId },
  })
  return data
}
