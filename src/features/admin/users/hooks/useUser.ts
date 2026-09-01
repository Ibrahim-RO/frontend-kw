import { useQuery } from '@tanstack/react-query'
import { fetchUser } from '../api/users.client'

export function useUser(id: number | string) {
  return useQuery({
    queryKey: ['admin-user', id],
    queryFn: () => fetchUser(id),
    enabled: Boolean(id),
  })
}
