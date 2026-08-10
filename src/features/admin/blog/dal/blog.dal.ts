import 'server-only'

import { adminApi } from '@/src/shared/lib/admin-api'

export async function listBlogPosts(params: { page?: number; limit?: number }) {
  const { data } = await adminApi.get('/blog', { params })
  return data
}

export async function getBlogPost(id: string) {
  const { data } = await adminApi.get(`/blog/${id}`)
  return data
}

export async function createBlogPost(payload: unknown) {
  const { data } = await adminApi.post('/blog', payload)
  return data
}

export async function updateBlogPost(id: string, payload: unknown) {
  const { data } = await adminApi.patch(`/blog/${id}`, payload)
  return data
}

export async function deleteBlogPost(id: string) {
  const { data } = await adminApi.delete(`/blog/${id}`)
  return data
}
