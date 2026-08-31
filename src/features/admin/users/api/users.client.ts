import axios from 'axios'
import type { AdminUser, PaginatedUsers } from '../types'

const usersClient = axios.create({ baseURL: '/api/admin/users' })

type ApiResponse<T> = { success: boolean; data: T; message?: string }

export type CreateUserPayload = {
  name: string
  last_name: string
  surname_name: string
  email: string
  phone: string
  profile: AdminUser['profile']
  password: string
}

export type UpdateUserPayload = Partial<CreateUserPayload>

export async function fetchUsers(params: { page?: number; limit?: number } = {}) {
  const { data } = await usersClient.get<PaginatedUsers>('', { params })
  return data
}

export async function fetchUser(id: number | string) {
  const { data } = await usersClient.get<AdminUser>(`/${id}`)
  return data
}

export async function createUser(payload: CreateUserPayload) {
  const { data } = await usersClient.post<ApiResponse<AdminUser>>('', payload)
  return data.data
}

export async function updateUser(id: number | string, payload: UpdateUserPayload) {
  const { data } = await usersClient.patch<ApiResponse<AdminUser>>(`/${id}`, payload)
  return data.data
}

export async function deleteUser(id: number | string) {
  const { data } = await usersClient.delete<ApiResponse<null>>(`/${id}`)
  return data
}
