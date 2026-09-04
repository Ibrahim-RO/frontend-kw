import axios from 'axios'
import type { AgentPropertiesResponse } from '../types'

const agentPropertiesClient = axios.create({ baseURL: '/api/agents' })

export async function fetchAgentProperties(agentId: number | string) {
  const { data } = await agentPropertiesClient.get<AgentPropertiesResponse>(`/${agentId}/properties`)
  return data
}
