import axios from 'axios'
import type { MyProfile } from '../types'

const profileClient = axios.create({ baseURL: '/api/admin/profile' })

type ApiResponse<T> = { success: boolean; data: T; message?: string }

export type UpdateProfilePayload = Partial<{
  name: string
  last_name: string
  surname_name: string
  email: string
  phone: string
  password: string
  current_password: string
}>

export async function fetchMyProfile() {
  const { data } = await profileClient.get<ApiResponse<MyProfile>>('')
  return data.data
}

export async function updateMyProfile(payload: UpdateProfilePayload) {
  const { data } = await profileClient.patch<ApiResponse<MyProfile>>('', payload)
  return data.data
}
