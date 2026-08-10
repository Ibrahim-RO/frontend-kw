import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createBlogPost,
  deleteBlogPost,
  updateBlogPost,
  type CreateBlogPayload,
  type UpdateBlogPayload,
} from '../api/blog.client'

export function useCreateBlogPost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateBlogPayload) => createBlogPost(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] })
    },
  })
}

export function useUpdateBlogPost(id: number | string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateBlogPayload) => updateBlogPost(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] })
      queryClient.invalidateQueries({ queryKey: ['blog-post', id] })
    },
  })
}

export function useDeleteBlogPost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number | string) => deleteBlogPost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] })
    },
  })
}
