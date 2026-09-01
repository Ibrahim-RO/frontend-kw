import z from 'zod'

export const profileInfoForm = z.object({
  name: z.string().min(1, 'El nombre es obligatorio').max(60, 'Máximo 60 caracteres'),
  last_name: z.string().min(1, 'El apellido paterno es obligatorio').max(60, 'Máximo 60 caracteres'),
  surname_name: z.string().min(1, 'El apellido materno es obligatorio').max(60, 'Máximo 60 caracteres'),
  email: z.email('Correo no válido'),
  phone: z.string().min(1, 'El teléfono es obligatorio'),
})

export type ProfileInfoFormValues = z.infer<typeof profileInfoForm>

export const changePasswordForm = z
  .object({
    current_password: z.string().min(1, 'Indica tu contraseña actual'),
    password: z.string().min(6, 'La nueva contraseña debe tener al menos 6 caracteres'),
    confirm_password: z.string().min(1, 'Confirma tu nueva contraseña'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Las contraseñas no coinciden',
    path: ['confirm_password'],
  })

export type ChangePasswordFormValues = z.infer<typeof changePasswordForm>
