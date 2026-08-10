import type { ReactNode } from 'react'
import { verifySession } from '@/src/features/admin/auth/dal/auth.dal'

export default async function AdminPanelLayout({ children }: { children: ReactNode }) {
  await verifySession()
  return children
}
