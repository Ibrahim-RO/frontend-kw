import 'server-only'

import { propertiesApi } from '@/src/shared/lib/properties-api'
import type { AgentPropertiesResponse } from '../properties/types'

export const getAgentById = async (agentId: number | string) => {
    const { data } = await propertiesApi.get<AgentPropertiesResponse>('/Agent_Properties_Info', {
        params: { Agent_ID: agentId, Properties_Listing_Init: 0 },
    })

    return data
}
