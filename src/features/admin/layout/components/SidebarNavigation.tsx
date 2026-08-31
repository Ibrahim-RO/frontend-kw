'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useMyProfile } from '@/src/features/admin/profile/hooks/useMyProfile'
import { adminNavItems } from '../config/nav-items.config'

export function SidebarNavigation() {
  const pathname = usePathname()
  const { data: profile } = useMyProfile()
  const isAdmin = profile?.profile === 'admin'

  return (
    <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
      {adminNavItems
        .filter((item) => !item.adminOnly || isAdmin)
        .map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground',
              )}
            >
              <item.icon className={cn('size-4 shrink-0', isActive && 'text-sidebar-primary')} />
              {item.label}
            </Link>
          )
        })}
    </nav>
  )
}
