import 'server-only'

import { adminApi } from '@/src/shared/lib/admin-api'

export async function getMyProfile() {
  const { data } = await adminApi.get('/users/me')
  return data
}

export async function updateMyProfile(payload: unknown) {
  const { data } = await adminApi.patch('/users/me', payload)
  return data
}
