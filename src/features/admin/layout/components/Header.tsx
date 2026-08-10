'use client'

import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { getPageTitle } from '../lib/get-page-title'
import { PageTitle } from './PageTitle'
import { SearchBar } from './SearchBar'
import { HeaderActions } from './HeaderActions'
import { UserMenu } from './UserMenu'

type HeaderProps = {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname()
  const title = getPageTitle(pathname)

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border bg-background px-4 lg:h-20 lg:gap-4 lg:px-8">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground lg:hidden"
        aria-label="Abrir menú"
      >
        <Menu className="size-5" />
      </button>

      <PageTitle title={title} />

      <div className="ml-auto flex flex-1 items-center justify-end gap-2 lg:gap-4">
        <SearchBar />
        <HeaderActions />
        <UserMenu />
      </div>
    </header>
  )
}
