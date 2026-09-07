export type UserProfileRole = 'admin' | 'marketing'

// Módulos del panel asignables a un usuario con perfil "marketing". Los 3
// `homepage:*` son sub-permisos de las pestañas del editor de Homepage y
// solo importan si el usuario también trae "homepage".
export type ModuleKey = 'homepage' | 'homepage:sections' | 'homepage:seo' | 'homepage:code' | 'blog'

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
