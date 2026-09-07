import Link from 'next/link'
import { adminFooterNavItems } from '../config/nav-items.config'
import { LogoutButton } from './LogoutButton'

export function SidebarFooter() {
  return (
    <div className="border-t border-sidebar-border px-3 py-4">
      <nav className="flex flex-col gap-1">
        {adminFooterNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <item.icon className="size-4 shrink-0" />
            {item.label}
          </Link>
        ))}

        <LogoutButton />
      </nav>
    </div>
  )
}
