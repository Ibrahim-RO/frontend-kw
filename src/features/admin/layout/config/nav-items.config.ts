import {
  Activity,
  Building2,
  LayoutDashboard,
  Megaphone,
  Newspaper,
  Search,
  Settings,
  Users,
  type LucideIcon,
} from 'lucide-react'

export type AdminNavItem = {
  label: string
  href: string
  icon: LucideIcon
  adminOnly?: boolean
}

export const adminNavItems: AdminNavItem[] = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Usuarios', href: '/admin/usuarios', icon: Users, adminOnly: true },
  { label: 'Propiedades', href: '/admin/propiedades', icon: Building2 },
  { label: 'Blog', href: '/admin/blog', icon: Newspaper },
  { label: 'Marketing', href: '/admin/marketing', icon: Megaphone },
  { label: 'SEO', href: '/admin/seo', icon: Search },
  { label: 'Configuración', href: '/admin/configuracion', icon: Settings },
]

export const adminFooterNavItems: AdminNavItem[] = [
  { label: 'Estado del sistema', href: '/admin/sistema', icon: Activity },
]
