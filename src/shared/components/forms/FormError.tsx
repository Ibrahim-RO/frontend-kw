import { ReactNode } from 'react'

export default function FormError({ children }: { children: ReactNode }) {
  return (
    <p className="border-l-4 p-2 font-bold bg-red-100 border-red-600 text-red-600 text-sm rounded-md">
      {children}
    </p>
  )
}
