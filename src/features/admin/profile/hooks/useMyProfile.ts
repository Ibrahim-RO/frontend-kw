import { useQuery } from '@tanstack/react-query'
import { fetchMyProfile } from '../api/profile.client'

export function useMyProfile() {
  return useQuery({
    queryKey: ['my-profile'],
    queryFn: fetchMyProfile,
    staleTime: 60 * 1000,
  })
}
