import 'server-only'

import { adminApi } from '@/src/shared/lib/admin-api'

export async function listBlogPosts(params: { page?: number; limit?: number }) {
  const { data } = await adminApi.get('/admin/blog', { params })
  return data
}

export async function getBlogPost(id: string) {
  const { data } = await adminApi.get(`/admin/blog/${id}`)
  return data
}

export async function createBlogPost(payload: unknown) {
  const { data } = await adminApi.post('/admin/blog', payload)
  return data
}

export async function updateBlogPost(id: string, payload: unknown) {
  const { data } = await adminApi.patch(`/admin/blog/${id}`, payload)
  return data
}

export async function deleteBlogPost(id: string) {
  const { data } = await adminApi.delete(`/admin/blog/${id}`)
  return data
}
