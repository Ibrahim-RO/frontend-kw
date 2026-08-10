import 'server-only'

import axios from 'axios'
import { verifySession } from '@/src/features/admin/auth/dal/auth.dal'

export const adminApi = axios.create({
  baseURL: process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL,
  headers: { Accept: 'application/json' },
})

adminApi.interceptors.request.use(async (config) => {
  const { token } = await verifySession()
  config.headers.Authorization = `Bearer ${token}`
  return config
})
