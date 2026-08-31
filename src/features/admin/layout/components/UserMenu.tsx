'use client'

import Link from 'next/link'
import { CircleUserRound, LogOut, UserCog } from 'lucide-react'
import { Menu } from '@base-ui/react/menu'
import { useMyProfile } from '@/src/features/admin/profile/hooks/useMyProfile'
import { logoutAction } from '@/src/features/admin/auth/actions/logout.action'

export function UserMenu() {
  const { data: profile } = useMyProfile()
  const fullName = profile ? `${profile.name} ${profile.last_name}` : 'Cuenta'

  return (
    <Menu.Root>
      <Menu.Trigger
        className="flex items-center gap-2 rounded-full p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        aria-label="Cuenta"
      >
        <CircleUserRound className="size-7" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner align="end" sideOffset={8} className="z-50 outline-none">
          <Menu.Popup className="w-56 rounded-lg border border-border bg-card p-1.5 text-card-foreground shadow-lg outline-none">
            <div className="px-2.5 py-2">
              <p className="truncate text-sm font-semibold text-foreground">{fullName}</p>
              {profile && <p className="truncate text-xs text-muted-foreground">{profile.email}</p>}
            </div>
            <div className="my-1 h-px bg-border" />
            <Menu.Item
              className="flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-2 text-sm text-foreground outline-none transition-colors data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground"
              render={<Link href="/admin/configuracion" />}
            >
              <UserCog className="size-4" />
              Mi perfil
            </Menu.Item>
            <div className="my-1 h-px bg-border" />
            <Menu.Item
              className="flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-2 text-sm text-destructive outline-none transition-colors data-[highlighted]:bg-destructive/10"
              onClick={() => {
                void logoutAction()
              }}
            >
              <LogOut className="size-4" />
              Cerrar sesión
            </Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}
