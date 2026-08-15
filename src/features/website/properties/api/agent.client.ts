import axios from 'axios'
import type { PropertyAgent } from '../types'

const agentClient = axios.create({ baseURL: '/api/agents' })

export async function fetchAgent(agentId: number | string) {
  const { data } = await agentClient.get<{ success: boolean; data: PropertyAgent[] }>(`/${agentId}`)
  return data.data[0] ?? null
}
