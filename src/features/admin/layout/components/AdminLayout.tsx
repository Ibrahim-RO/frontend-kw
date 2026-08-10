'use client'

import { useState, type ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Main } from './Main'

type AdminLayoutProps = {
  children: ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-muted/30">
      <Sidebar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
      <Main onMenuClick={() => setIsMobileNavOpen(true)}>{children}</Main>
    </div>
  )
}
