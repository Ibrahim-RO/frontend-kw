import 'server-only'

import type { BlogPost, PaginatedBlogPosts } from '../types'

const emptyList: PaginatedBlogPosts = {
  data: [],
  meta: { total: 0, page: 1, limit: 9, totalPages: 1, hasNextPage: false, hasPreviousPage: false },
}

function apiBase() {
  return process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL
}

export async function listPublishedPosts(page = 1, limit = 9): Promise<PaginatedBlogPosts> {
  const base = apiBase()
  if (!base) return emptyList

  try {
    const response = await fetch(`${base}/blog?page=${page}&limit=${limit}`, {
      next: { revalidate: 60, tags: ['blog'] },
    })
    return response.ok ? response.json() : emptyList
  } catch {
    return emptyList
  }
}

export async function getPublishedPostBySlug(slug: string): Promise<BlogPost | null> {
  const base = apiBase()
  if (!base) return null

  try {
    const response = await fetch(`${base}/blog/${encodeURIComponent(slug)}`, {
      next: { revalidate: 60, tags: ['blog', `blog:${slug}`] },
    })
    return response.ok ? response.json() : null
  } catch {
    return null
  }
}
