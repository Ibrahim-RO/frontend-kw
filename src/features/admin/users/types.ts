export type UserProfileRole = 'admin' | 'marketing'

// Módulos del panel asignables a un usuario con perfil "marketing".
// Homepage/Blog ya existen; SEO/Marketing se dejan listados para cuando se
// construyan esas secciones (ver frontend-kw/CLAUDE.md).
export type ModuleKey = 'homepage' | 'blog' | 'seo' | 'marketing'

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
  modules: ModuleKey[]
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
