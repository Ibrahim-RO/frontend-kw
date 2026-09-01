'use client'

import { useState } from 'react'
import Link from 'next/link'
import { isAxiosError } from 'axios'
import { Pencil, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useUsers } from '../hooks/useUsers'
import { useDeleteUser } from '../hooks/useUserMutations'
import { UserProfileBadge } from './UserProfileBadge'
import { ConfirmDialog } from '@/src/shared/components/ConfirmDialog'
import { Pagination } from '@/src/shared/components/Pagination'

const PAGE_SIZE = 10

export function UsersTable() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError, error } = useUsers({ page, limit: PAGE_SIZE })
  const deleteMutation = useDeleteUser()

  const handleDelete = (id: number, fullName: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => toast.success(`Usuario "${fullName}" eliminado`),
      onError: () => toast.error('No se pudo eliminar el usuario'),
    })
  }

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Cargando usuarios...</p>
  }

  if (isError) {
    const forbidden = isAxiosError(error) && error.response?.status === 403
    return (
      <p className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-destructive">
        {forbidden
          ? 'No tienes permiso para ver el listado de usuarios.'
          : 'No se pudieron cargar los usuarios.'}
      </p>
    )
  }

  const users = data?.data ?? []
  const totalPages = data?.meta.totalPages ?? 1

  if (users.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        {page > 1 ? 'No hay más usuarios en esta página.' : 'Todavía no hay usuarios. Crea el primero.'}
      </p>
    )
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Nombre</th>
              <th className="px-4 py-3 font-medium">Correo</th>
              <th className="px-4 py-3 font-medium">Teléfono</th>
              <th className="px-4 py-3 font-medium">Perfil</th>
              <th className="px-4 py-3 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((user) => {
              const fullName = `${user.name} ${user.last_name} ${user.surname_name}`
              return (
                <tr key={user.user_id}>
                  <td className="px-4 py-3 font-medium text-foreground">{fullName}</td>
                  <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                  <td className="px-4 py-3 text-muted-foreground">{user.phone}</td>
                  <td className="px-4 py-3">
                    <UserProfileBadge profile={user.profile} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Link
                        href={`/admin/usuarios/${user.user_id}`}
                        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                        aria-label="Editar"
                      >
                        <Pencil className="size-4" />
                      </Link>
                      <ConfirmDialog
                        trigger={<Trash2 className="size-4" />}
                        triggerClassName="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                        title="Eliminar usuario"
                        description={`¿Seguro que quieres eliminar a "${fullName}"? Se desactivará su cuenta, no se borra el historial.`}
                        confirmLabel="Eliminar"
                        destructive
                        onConfirm={() => handleDelete(user.user_id, fullName)}
                      />
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  )
}
