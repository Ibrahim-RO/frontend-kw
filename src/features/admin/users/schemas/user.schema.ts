import z from 'zod'

export const userProfileOptions = [
  { value: 'admin', label: 'Administrador' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'seo', label: 'SEO' },
  { value: 'usuario', label: 'Usuario' },
] as const

const baseUserFields = {
  name: z.string().min(1, 'El nombre es obligatorio').max(60, 'Máximo 60 caracteres'),
  last_name: z.string().min(1, 'El apellido paterno es obligatorio').max(60, 'Máximo 60 caracteres'),
  surname_name: z.string().min(1, 'El apellido materno es obligatorio').max(60, 'Máximo 60 caracteres'),
  email: z.email('Correo no válido'),
  phone: z.string().min(1, 'El teléfono es obligatorio'),
  profile: z.enum(['admin', 'marketing', 'seo', 'usuario'], 'Selecciona un perfil'),
}

export const createUserForm = z.object({
  ...baseUserFields,
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

export const editUserForm = z.object({
  ...baseUserFields,
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').optional().or(z.literal('')),
})

export type CreateUserFormValues = z.infer<typeof createUserForm>
export type EditUserFormValues = z.infer<typeof editUserForm>
