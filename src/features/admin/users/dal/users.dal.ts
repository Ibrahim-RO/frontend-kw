import 'server-only'

import { adminApi } from '@/src/shared/lib/admin-api'

export async function listUsers(params: { page?: number; limit?: number }) {
  const { data } = await adminApi.get('/users', { params })
  return data
}

export async function getUser(id: string) {
  const { data } = await adminApi.get(`/users/${id}`)
  return data
}

export async function createUser(payload: unknown) {
  const { data } = await adminApi.post('/users', payload)
  return data
}

export async function updateUser(id: string, payload: unknown) {
  const { data } = await adminApi.patch(`/users/${id}`, payload)
  return data
}

export async function deleteUser(id: string) {
  const { data } = await adminApi.delete(`/users/${id}`)
  return data
}
