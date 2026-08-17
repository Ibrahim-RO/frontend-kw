import axios from "axios";

export const marketCentersApi = axios.create({
  baseURL:
    process.env.MARKET_CENTERS_API_URL ??
    'https://cuj9iqvhg9.execute-api.us-east-2.amazonaws.com/Produccion/Agent_API/Listed_Agents_Info?Agents_Listing_Init=0',
  headers: { Accept: 'application/json' },
})