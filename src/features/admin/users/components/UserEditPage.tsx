'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useUser } from '../hooks/useUser'
import { UserForm } from './UserForm'

export function UserEditPage({ id }: { id: string }) {
  const { data: user, isLoading, isError } = useUser(id)

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
        <h1 className="mt-2 font-heading text-xl font-semibold text-foreground">Editar usuario</h1>
      </div>

      {isLoading && <p className="text-sm text-muted-foreground">Cargando usuario...</p>}
      {isError && <p className="text-sm text-destructive">No se pudo cargar el usuario.</p>}
      {user && <UserForm mode="edit" user={user} />}
    </div>
  )
}
