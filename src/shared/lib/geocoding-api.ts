import 'server-only'

import axios from 'axios'

export const geocodingApi = axios.create({
  baseURL: 'https://nominatim.openstreetmap.org',
  headers: {
    Accept: 'application/json',
    'User-Agent': 'kw-mexico-website/1.0 (contacto@kwmexico.com)',
  },
})
