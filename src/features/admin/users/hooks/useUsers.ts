import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from '../api/users.client'

export function useUsers(params: { page?: number; limit?: number } = {}) {
  return useQuery({
    queryKey: ['admin-users', params],
    queryFn: () => fetchUsers(params),
    placeholderData: (previousData) => previousData,
  })
}
