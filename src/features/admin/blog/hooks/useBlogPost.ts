import { useQuery } from '@tanstack/react-query'
import { fetchBlogPost } from '../api/blog.client'

export function useBlogPost(id: number | string) {
  return useQuery({
    queryKey: ['blog-post', id],
    queryFn: () => fetchBlogPost(id),
    enabled: Boolean(id),
  })
}
