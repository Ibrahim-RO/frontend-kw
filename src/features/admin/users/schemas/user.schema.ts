import z from 'zod'

export const userProfileOptions = [
  { value: 'admin', label: 'Administrador' },
  { value: 'marketing', label: 'Marketing' },
] as const

// Debe reflejar backend-kw's ModuleKey (src/users/enums/module-key.enum.ts).
export const moduleOptions = [
  { value: 'homepage', label: 'Homepage' },
  { value: 'blog', label: 'Blog' },
  { value: 'seo', label: 'SEO' },
  { value: 'marketing', label: 'Marketing' },
] as const

// Sub-permisos de las 3 pestañas del editor de Homepage (HomepageEditor.tsx)
// — solo aplican si "homepage" también está marcado.
export const homepageSubmoduleOptions = [
  { value: 'homepage:sections', label: 'Secciones' },
  { value: 'homepage:seo', label: 'SEO y Schema' },
  { value: 'homepage:code', label: 'Head y Body' },
] as const

const moduleKeyValues = [
  'homepage',
  'homepage:sections',
  'homepage:seo',
  'homepage:code',
  'blog',
  'seo',
  'marketing',
] as const

const baseUserFields = {
  name: z.string().min(1, 'El nombre es obligatorio').max(60, 'Máximo 60 caracteres'),
  last_name: z.string().min(1, 'El apellido paterno es obligatorio').max(60, 'Máximo 60 caracteres'),
  surname_name: z.string().min(1, 'El apellido materno es obligatorio').max(60, 'Máximo 60 caracteres'),
  email: z.email('Correo no válido'),
  phone: z.string().min(1, 'El teléfono es obligatorio'),
  profile: z.enum(['admin', 'marketing'], 'Selecciona un perfil'),
  modules: z.array(z.enum(moduleKeyValues)).default([]),
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
