import axios from "axios"
import type { MarketCenterAgentsResponse } from "../properties/types"

export const getAgents = async (offset: number, marketCenterId?: string, name?: string) => {
    const trimmedName = name?.trim();
    const endpoint = trimmedName
        ? 'https://cuj9iqvhg9.execute-api.us-east-2.amazonaws.com/Produccion/Agent_API/Wanted_Name_Listed_Agents_Info'
        : marketCenterId
          ? 'https://cuj9iqvhg9.execute-api.us-east-2.amazonaws.com/Produccion/Agent_API/Market_Center_Listed_Agents_Info'
          : 'https://cuj9iqvhg9.execute-api.us-east-2.amazonaws.com/Produccion/Agent_API/Listed_Agents_Info';
    const params = trimmedName
        ? {
            Wanted_Name: trimmedName,
            Agents_Listing_Offset: offset,
            Market_Center_ID: marketCenterId || '*',
        }
        : marketCenterId
          ? { Market_Center_ID: marketCenterId, Agents_Listing_Offset: offset }
          : { Agents_Listing_Init: offset };
    const response = await axios.get<MarketCenterAgentsResponse>(endpoint, { params });

    return response.data;
}
