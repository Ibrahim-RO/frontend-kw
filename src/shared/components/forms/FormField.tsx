import { ReactNode } from 'react'

export default function FormField({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className="space-y-3">{children}</div>
}
