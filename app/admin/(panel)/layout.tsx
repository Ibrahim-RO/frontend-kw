import type { ReactNode } from 'react'
import { verifySession } from '@/src/features/admin/auth/dal/auth.dal'
import { AdminLayout } from '@/src/features/admin/layout/components/AdminLayout'

export default async function AdminPanelLayout({ children }: { children: ReactNode }) {
  await verifySession()
  return <AdminLayout>{children}</AdminLayout>
}
