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
  // { label: 'Marketing', href: '/admin/marketing', icon: Megaphone, moduleKey: 'marketing' },
  // { label: 'SEO', href: '/admin/seo', icon: Search, moduleKey: 'seo' },
  { label: 'Blog', href: '/admin/blog', icon: Newspaper, moduleKey: 'blog' },
  { label: 'Usuarios', href: '/admin/usuarios', icon: Users, adminOnly: true },
  { label: 'Configuración', href: '/admin/configuracion', icon: Settings },
]

export const adminFooterNavItems: AdminNavItem[] = [
  { label: 'Estado del sistema', href: '/admin/sistema', icon: Activity },
]
