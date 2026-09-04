import z from 'zod'

export const blogForm = z.object({
  title: z.string().min(1, 'El título es obligatorio').max(150, 'Máximo 150 caracteres'),
  slug: z.string().max(160, 'Máximo 160 caracteres').optional(),
  published_at: z.string().min(1, 'La fecha de publicación es obligatoria'),
  content: z.string().min(1, 'El contenido es obligatorio'),
  featured_image_url: z.string().optional(),
  extra_authors: z.string().optional(),
})

export type BlogFormValues = z.infer<typeof blogForm>
