import {
  Activity,
  Building2,
  LayoutDashboard,
  Megaphone,
  Newspaper,
  Search,
  Settings,
  PanelsTopLeft,
  Users,
  type LucideIcon,
} from 'lucide-react'
import type { ModuleKey } from '@/src/features/admin/users/types'

export type AdminNavItem = {
  label: string
  href: string
  icon: LucideIcon
  /** Solo visible para perfil admin (sin excepción por módulo). */
  adminOnly?: boolean
  /** Requiere que el usuario "marketing" tenga este módulo asignado; admin siempre lo ve. */
  moduleKey?: ModuleKey
}

export const adminNavItems: AdminNavItem[] = [
  // { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  // { label: 'Propiedades', href: '/admin/propiedades', icon: Building2 },
  { label: 'Homepage', href: '/admin/homepage', icon: PanelsTopLeft, moduleKey: 'homepage' },
  // { label: 'Marketing', href: '/admin/marketing', icon: Megaphone },
  // { label: 'SEO', href: '/admin/seo', icon: Search },
  { label: 'Blog', href: '/admin/blog', icon: Newspaper, moduleKey: 'blog' },
  { label: 'Usuarios', href: '/admin/usuarios', icon: Users, adminOnly: true },
  { label: 'Configuración', href: '/admin/configuracion', icon: Settings },
]

export const adminFooterNavItems: AdminNavItem[] = [
  { label: 'Estado del sistema', href: '/admin/sistema', icon: Activity },
]

export function canAccessNavItem(item: AdminNavItem, isAdmin: boolean, modules: ModuleKey[]): boolean {
  if (item.adminOnly) return isAdmin
  if (item.moduleKey) return isAdmin || modules.includes(item.moduleKey)
  return true
}

// A dónde mandar a alguien justo después de iniciar sesión: el primer link
// del panel al que su perfil/módulos le den acceso (mismo orden de
// `adminNavItems`); "Configuración" (su propio perfil) siempre es accesible
// y sirve de último recurso si no tiene ningún módulo asignado todavía.
export function getDefaultAdminRoute(profile: string, modules: ModuleKey[]): string {
  const isAdmin = profile === 'admin'
  const accessible = adminNavItems.find((item) => canAccessNavItem(item, isAdmin, modules))
  return accessible?.href ?? '/admin/configuracion'
}
