import { useQuery } from '@tanstack/react-query'
import { fetchAgent } from '../api/agent.client'

export function useAgent(agentId: number) {
  return useQuery({
    queryKey: ['agent', agentId],
    queryFn: () => fetchAgent(agentId),
    staleTime: 30 * 60 * 1000,
  })
}
