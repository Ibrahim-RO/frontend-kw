export type UserProfileRole = 'admin' | 'marketing' | 'seo' | 'usuario'

export type AdminUser = {
  user_id: number
  name: string
  last_name: string
  surname_name: string
  email: string
  phone: string
  avatar_url?: string | null
  status: boolean
  profile: UserProfileRole
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

export type PaginatedUsers = {
  data: AdminUser[]
  meta: PaginationMeta
}
