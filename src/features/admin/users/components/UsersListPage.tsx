'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'
import { UsersTable } from './UsersTable'

export function UsersListPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-xl font-semibold text-foreground">Usuarios</h1>
          <p className="text-sm text-muted-foreground">Administra las cuentas del panel.</p>
        </div>
        <Link
          href="/admin/usuarios/nuevo"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Plus className="size-4" />
          Nuevo usuario
        </Link>
      </div>

      <UsersTable />
    </div>
  )
}
