import type { ReactNode } from 'react'

type ContentProps = {
  children: ReactNode
}

export function Content({ children }: ContentProps) {
  return (
    <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-screen-2xl">{children}</div>
    </main>
  )
}
