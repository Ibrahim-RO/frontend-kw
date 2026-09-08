'use client'

import { LogOut } from 'lucide-react'
import { useLogout } from '@/src/features/admin/auth/hooks/useLogout'

export function LogoutButton() {
  const logout = useLogout()

  return (
    <button
      type="button"
      onClick={logout}
      className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    >
      <LogOut className="size-4 shrink-0" />
      Cerrar sesión
    </button>
  )
}
