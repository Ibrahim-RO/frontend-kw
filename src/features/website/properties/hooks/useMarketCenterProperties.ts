import { useQuery } from '@tanstack/react-query'
import { fetchMarketCenterAgents } from '../api/market-centers.client'
import { fetchAgentProperties } from '../api/agent-properties.client'
import { AGENTS_PAGE_SIZE } from './useMarketCenterAgents'
import type { Property } from '../types'

// No existe un filtro por Market Center en el API externo de propiedades
// (Coordinates_Properties_Info / Listed_Properties_Info lo ignoran si se
// manda), asi que se arma la lista agregando las propiedades de cada agente
// del Market Center (Agent_Properties_Info si trae todas las de un agente
// en una sola llamada, sin paginar).
async function fetchAllAgents(marketCenterId: number | string) {
  const first = await fetchMarketCenterAgents(marketCenterId, 0)
  const total = first.data.Total_Agents
  const agents = [...first.data.Agents_Data]

  const remainingOffsets: number[] = []
  for (let offset = AGENTS_PAGE_SIZE; offset < total; offset += AGENTS_PAGE_SIZE) {
    remainingOffsets.push(offset)
  }

  const rest = await Promise.all(remainingOffsets.map((offset) => fetchMarketCenterAgents(marketCenterId, offset)))
  rest.forEach((page) => agents.push(...page.data.Agents_Data))

  return agents
}

export function useMarketCenterProperties(marketCenterId: number | string, enabled: boolean) {
  return useQuery({
    queryKey: ['market-center-properties', marketCenterId],
    queryFn: async () => {
      const agents = await fetchAllAgents(marketCenterId)

      const results = await Promise.all(
        agents.map((agent) => fetchAgentProperties(agent.ID).catch(() => null)),
      )

      const byId = new Map<number, Property>()
      for (const result of results) {
        if (!result) continue
        for (const property of result.data.Agent_Properties) {
          byId.set(property.ID, property)
        }
      }

      return { properties: Array.from(byId.values()) }
    },
    enabled,
    staleTime: 15 * 60 * 1000,
  })
}
