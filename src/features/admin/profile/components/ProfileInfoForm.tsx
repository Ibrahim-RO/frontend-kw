'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Form, FormField, FormLabel, FormInput, FormSubmit, FormError } from '@/src/shared/components/forms'
import { profileInfoForm, type ProfileInfoFormValues } from '../schemas/profile.schema'
import { useUpdateMyProfile } from '../hooks/useUpdateMyProfile'
import type { MyProfile } from '../types'

export function ProfileInfoForm({ profile }: { profile: MyProfile }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileInfoForm),
    defaultValues: {
      name: profile.name,
      last_name: profile.last_name,
      surname_name: profile.surname_name,
      email: profile.email,
      phone: profile.phone,
    },
  })

  const updateMutation = useUpdateMyProfile()

  const onSubmit = (values: ProfileInfoFormValues) => {
    updateMutation.mutate(values, {
      onSuccess: () => toast.success('Perfil actualizado'),
      onError: () => toast.error('No se pudieron guardar los cambios'),
    })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-3">
        <FormField>
          <FormLabel htmlFor="name" required>
            Nombre
          </FormLabel>
          <FormInput id="name" placeholder="Nombre" {...register('name')} />
          {errors.name && <FormError>{errors.name.message}</FormError>}
        </FormField>

        <FormField>
          <FormLabel htmlFor="last_name" required>
            Apellido paterno
          </FormLabel>
          <FormInput id="last_name" placeholder="Apellido paterno" {...register('last_name')} />
          {errors.last_name && <FormError>{errors.last_name.message}</FormError>}
        </FormField>

        <FormField>
          <FormLabel htmlFor="surname_name" required>
            Apellido materno
          </FormLabel>
          <FormInput id="surname_name" placeholder="Apellido materno" {...register('surname_name')} />
          {errors.surname_name && <FormError>{errors.surname_name.message}</FormError>}
        </FormField>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField>
          <FormLabel htmlFor="email" required>
            Correo electrónico
          </FormLabel>
          <FormInput id="email" type="email" placeholder="correo@kwmexico.com" {...register('email')} />
          {errors.email && <FormError>{errors.email.message}</FormError>}
        </FormField>

        <FormField>
          <FormLabel htmlFor="phone" required>
            Teléfono
          </FormLabel>
          <FormInput id="phone" placeholder="Teléfono" {...register('phone')} />
          {errors.phone && <FormError>{errors.phone.message}</FormError>}
        </FormField>
      </div>

      <FormSubmit
        disabled={updateMutation.isPending}
        className="w-auto bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60"
      >
        Guardar cambios
      </FormSubmit>
    </Form>
  )
}
