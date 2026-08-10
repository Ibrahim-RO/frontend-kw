import type { ReactNode } from 'react'
import { Header } from './Header'
import { Content } from './Content'

type MainProps = {
  onMenuClick: () => void
  children: ReactNode
}

export function Main({ onMenuClick, children }: MainProps) {
  return (
    <div className="flex h-screen min-w-0 flex-1 flex-col">
      <Header onMenuClick={onMenuClick} />
      <Content>{children}</Content>
    </div>
  )
}
