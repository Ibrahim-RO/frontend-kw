import axios from 'axios'
import type { BlogPost, PaginatedBlogPosts } from '../types'

const blogClient = axios.create({ baseURL: '/api/admin/blog' })

type ApiResponse<T> = { success: boolean; data: T; message?: string }

export type CreateBlogPayload = {
  title: string
  slug?: string
  published_at: string
  content: string
  featured_image_url?: string
  extra_authors?: string
}

export type UpdateBlogPayload = Partial<CreateBlogPayload> & {
  status?: BlogPost['status']
}

export async function fetchBlogPosts(params: { page?: number; limit?: number } = {}) {
  const { data } = await blogClient.get<PaginatedBlogPosts>('', { params })
  return data
}

export async function fetchBlogPost(id: number | string) {
  const { data } = await blogClient.get<BlogPost>(`/${id}`)
  return data
}

export async function createBlogPost(payload: CreateBlogPayload) {
  const { data } = await blogClient.post<ApiResponse<BlogPost>>('', payload)
  return data.data
}

export async function updateBlogPost(id: number | string, payload: UpdateBlogPayload) {
  const { data } = await blogClient.patch<ApiResponse<BlogPost>>(`/${id}`, payload)
  return data.data
}

export async function deleteBlogPost(id: number | string) {
  const { data } = await blogClient.delete<ApiResponse<null>>(`/${id}`)
  return data
}
