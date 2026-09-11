import Link from 'next/link'
import { LogoutButton } from './LogoutButton'

export function SidebarFooter() {
  return (
    <div className="border-t border-sidebar-border px-3 py-4">
      <nav className="flex flex-col gap-1">        
        <LogoutButton />
      </nav>
    </div>
  )
}
