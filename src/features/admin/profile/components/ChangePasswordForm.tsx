'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import { Form, FormField, FormLabel, FormInput, FormSubmit, FormError } from '@/src/shared/components/forms'
import { changePasswordForm, type ChangePasswordFormValues } from '../schemas/profile.schema'
import { useUpdateMyProfile } from '../hooks/useUpdateMyProfile'

export function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordForm),
    defaultValues: { current_password: '', password: '', confirm_password: '' },
  })

  const updateMutation = useUpdateMyProfile()

  const onSubmit = (values: ChangePasswordFormValues) => {
    updateMutation.mutate(
      { current_password: values.current_password, password: values.password },
      {
        onSuccess: () => {
          toast.success('Contraseña actualizada')
          reset()
        },
        onError: (error) => {
          const message =
            isAxiosError(error) && error.response?.status === 401
              ? 'Tu contraseña actual no es correcta'
              : 'No se pudo cambiar la contraseña'
          toast.error(message)
        },
      },
    )
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-6">
      <FormField>
        <FormLabel htmlFor="current_password" required>
          Contraseña actual
        </FormLabel>
        <FormInput
          id="current_password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          {...register('current_password')}
        />
        {errors.current_password && <FormError>{errors.current_password.message}</FormError>}
      </FormField>

      <FormField>
        <FormLabel htmlFor="password" required>
          Nueva contraseña
        </FormLabel>
        <FormInput
          id="password"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          {...register('password')}
        />
        {errors.password && <FormError>{errors.password.message}</FormError>}
      </FormField>

      <FormField>
        <FormLabel htmlFor="confirm_password" required>
          Confirmar nueva contraseña
        </FormLabel>
        <FormInput
          id="confirm_password"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          {...register('confirm_password')}
        />
        {errors.confirm_password && <FormError>{errors.confirm_password.message}</FormError>}
      </FormField>

      <FormSubmit
        disabled={updateMutation.isPending}
        className="w-auto bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60"
      >
        Cambiar contraseña
      </FormSubmit>
    </Form>
  )
}
