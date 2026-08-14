import 'server-only'

import axios from 'axios'

export const marketCentersApi = axios.create({
  baseURL:
    process.env.MARKET_CENTERS_API_URL ??
    'https://cuj9iqvhg9.execute-api.us-east-2.amazonaws.com/Produccion/Market_Center_API',
  headers: { Accept: 'application/json' },
})

export const marketCenterAgentsApi = axios.create({
  baseURL:
    process.env.MARKET_CENTER_AGENTS_API_URL ??
    'https://cuj9iqvhg9.execute-api.us-east-2.amazonaws.com/Produccion/Agent_API',
  headers: { Accept: 'application/json' },
})
