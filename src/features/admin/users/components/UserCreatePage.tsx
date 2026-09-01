'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { UserForm } from './UserForm'

export function UserCreatePage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/usuarios"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Volver a usuarios
        </Link>
        <h1 className="mt-2 font-heading text-xl font-semibold text-foreground">Nuevo usuario</h1>
      </div>

      <UserForm mode="create" />
    </div>
  )
}
