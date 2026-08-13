import 'server-only'

import axios from 'axios'

export const propertiesApi = axios.create({
  baseURL:
    process.env.PROPERTIES_API_URL ??
    'https://cuj9iqvhg9.execute-api.us-east-2.amazonaws.com/Produccion/Properties_API',
  headers: { Accept: 'application/json' },
})
