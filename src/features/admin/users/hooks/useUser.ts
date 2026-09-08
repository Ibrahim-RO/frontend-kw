import { useQuery } from '@tanstack/react-query'
import { fetchUser } from '../api/users.client'

export function useUser(id: number | string) {
  return useQuery({
    // Siempre string: useUpdateUser recibe el id como number (user.user_id)
    // e invalida con la misma normalización — si no coinciden los tipos,
    // react-query los trata como keys distintas y la invalidación no pega.
    queryKey: ['admin-user', String(id)],
    queryFn: () => fetchUser(id),
    enabled: Boolean(id),
  })
}
