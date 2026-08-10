import { useQuery } from '@tanstack/react-query'
import { fetchBlogPosts } from '../api/blog.client'

export function useBlogPosts(params: { page?: number; limit?: number } = {}) {
  return useQuery({
    queryKey: ['blog-posts', params],
    queryFn: () => fetchBlogPosts(params),
  })
}
