export type BlogAuthor = {
  user_id: number
  name: string
  last_name: string
  surname_name: string
}

export type BlogPost = {
  blog_id: number
  title: string
  slug: string
  published_at: string
  content: string
  featured_image_url: string | null
  extra_authors: string | null
  author: BlogAuthor
  created_at: string
  updated_at: string
}

export type PaginationMeta = {
  total: number
  page: number
  limit: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export type PaginatedBlogPosts = {
  data: BlogPost[]
  meta: PaginationMeta
}
