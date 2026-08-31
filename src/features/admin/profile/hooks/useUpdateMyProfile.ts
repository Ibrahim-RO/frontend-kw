import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateMyProfile, type UpdateProfilePayload } from '../api/profile.client'

export function useUpdateMyProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateMyProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-profile'] })
    },
  })
}
