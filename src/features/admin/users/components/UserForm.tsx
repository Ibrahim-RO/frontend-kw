'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  Form,
  FormField,
  FormLabel,
  FormInput,
  FormSelect,
  FormSubmit,
  FormError,
} from '@/src/shared/components/forms'
import { createUserForm, editUserForm, moduleOptions, userProfileOptions } from '../schemas/user.schema'
import { useCreateUser, useUpdateUser } from '../hooks/useUserMutations'
import type { AdminUser, ModuleKey } from '../types'

type UserFormProps =
  | { mode: 'create'; user?: undefined }
  | { mode: 'edit'; user: AdminUser }

export function UserForm({ mode, user }: UserFormProps) {
  const router = useRouter()
  const schema = mode === 'create' ? createUserForm : editUserForm

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name ?? '',
      last_name: user?.last_name ?? '',
      surname_name: user?.surname_name ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
      profile: user?.profile ?? 'marketing',
      modules: user?.modules ?? [],
      password: '',
    },
  })

  const profile = watch('profile')
  const modules = watch('modules') ?? []
  const isMarketing = profile === 'marketing'

  const toggleModule = (module: ModuleKey, checked: boolean) => {
    setValue('modules', checked ? [...modules, module] : modules.filter((m) => m !== module))
  }

  const createMutation = useCreateUser()
  const updateMutation = useUpdateUser(user?.user_id ?? '')
  const isSubmitting = createMutation.isPending || updateMutation.isPending

  const onSubmit = (values: {
    name: string
    last_name: string
    surname_name: string
    email: string
    phone: string
    profile: string
    modules: string[]
    password?: string
  }) => {
    const modules = values.profile === 'marketing' ? (values.modules as ModuleKey[]) : []

    if (mode === 'create') {
      createMutation.mutate(
        { ...values, profile: values.profile as AdminUser['profile'], modules, password: values.password ?? '' },
        {
          onSuccess: () => {
            toast.success('Usuario creado')
            router.push('/admin/usuarios')
          },
          onError: () => toast.error('No se pudo crear el usuario'),
        },
      )
      return
    }

    const payload = { ...values, profile: values.profile as AdminUser['profile'], modules }
    if (!payload.password) delete payload.password

    updateMutation.mutate(payload, {
      onSuccess: () => {
        toast.success('Cambios guardados')
        router.push('/admin/usuarios')
      },
      onError: () => toast.error('No se pudieron guardar los cambios'),
    })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

        <FormField>
          <FormLabel htmlFor="profile" required>
            Perfil
          </FormLabel>
          <FormSelect id="profile" {...register('profile')}>
            {userProfileOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </FormSelect>
          {errors.profile && <FormError>{errors.profile.message}</FormError>}
        </FormField>
      </div>

      {isMarketing ? (
        <FormField>
          <FormLabel>Módulos con acceso</FormLabel>
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {moduleOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-foreground has-checked:border-primary has-checked:bg-primary/5"
              >
                <input
                  type="checkbox"
                  className="size-4 accent-primary"
                  checked={modules.includes(option.value)}
                  onChange={(event) => toggleModule(option.value, event.target.checked)}
                />
                {option.label}
              </label>
            ))}
          </div>
          {errors.modules && <FormError>{errors.modules.message}</FormError>}
        </FormField>
      ) : (
        <p className="text-sm text-muted-foreground">
          El perfil Administrador tiene acceso a todos los módulos del panel.
        </p>
      )}

      <div className="max-w-sm">
        <FormField>
          <FormLabel htmlFor="password" required={mode === 'create'}>
            {mode === 'create' ? 'Contraseña' : 'Nueva contraseña'}
          </FormLabel>
          <FormInput
            id="password"
            type="password"
            autoComplete="new-password"
            placeholder={mode === 'create' ? '••••••••' : 'Dejar en blanco para no cambiarla'}
            {...register('password')}
          />
          {errors.password && <FormError>{errors.password.message}</FormError>}
        </FormField>
      </div>

      <FormSubmit
        disabled={isSubmitting}
        className="w-auto bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60"
      >
        {mode === 'create' ? 'Crear usuario' : 'Guardar cambios'}
      </FormSubmit>
    </Form>
  )
}
