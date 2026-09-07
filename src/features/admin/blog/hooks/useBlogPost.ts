import { useQuery } from '@tanstack/react-query'
import { fetchBlogPost } from '../api/blog.client'

export function useBlogPost(id: number | string) {
  return useQuery({
    // String siempre: useUpdateBlogPost recibe el id como number
    // (post.blog_id) e invalida con esa misma normalización — ver la nota
    // equivalente en useUser.ts (mismo bug ahí, ya corregido).
    queryKey: ['blog-post', String(id)],
    queryFn: () => fetchBlogPost(id),
    enabled: Boolean(id),
  })
}
