'use client'

import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Switch } from '@base-ui/react/switch'
import { toast } from 'sonner'
import {
  Form,
  FormField,
  FormLabel,
  FormInput,
  FormSubmit,
  FormError,
} from '@/src/shared/components/forms'
import { ImageUpload } from '@/src/shared/components/ImageUpload'
import { blogForm, type BlogFormValues } from '../schemas/blog.schema'
import { RichTextEditor } from './RichTextEditor'
import { slugify } from '../lib/slugify'
import { useCreateBlogPost, useUpdateBlogPost } from '../hooks/useBlogMutations'
import type { BlogPost } from '../types'

type BlogFormProps =
  | { mode: 'create'; blogPost?: undefined }
  | { mode: 'edit'; blogPost: BlogPost }

function toDateInputValue(value?: string) {
  if (!value) return ''
  return value.slice(0, 10)
}

export function BlogForm({ mode, blogPost }: BlogFormProps) {
  const router = useRouter()
  const [slugTouched, setSlugTouched] = useState(mode === 'edit')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<BlogFormValues>({
    resolver: zodResolver(blogForm),
    defaultValues: {
      title: blogPost?.title ?? '',
      slug: blogPost?.slug ?? '',
      published_at:
        toDateInputValue(blogPost?.published_at) || toDateInputValue(new Date().toISOString()),
      content: blogPost?.content ?? '',
      featured_image_url: blogPost?.featured_image_url ?? '',
      extra_authors: blogPost?.extra_authors ?? '',
      status: blogPost?.status === 'publicado' ? 'publicado' : 'borrador',
    },
  })

  const title = watch('title')
  const featuredImageUrl = watch('featured_image_url')
  const status = watch('status')

  useEffect(() => {
    if (slugTouched) return
    setValue('slug', slugify(title))
  }, [title, slugTouched, setValue])

  const createMutation = useCreateBlogPost()
  const updateMutation = useUpdateBlogPost(blogPost?.blog_id ?? '')
  const isSubmitting = createMutation.isPending || updateMutation.isPending

  const onSubmit = (values: BlogFormValues) => {
    const payload = {
      ...values,
      slug: values.slug || undefined,
      featured_image_url: values.featured_image_url || undefined,
      extra_authors: values.extra_authors || undefined,
    }

    if (mode === 'create') {
      createMutation.mutate(payload, {
        onSuccess: () => {
          toast.success('Entrada de blog creada')
          router.push('/admin/blog')
        },
        onError: () => toast.error('No se pudo crear la entrada'),
      })
      return
    }

    updateMutation.mutate(payload, {
      onSuccess: () => {
        toast.success('Cambios guardados')
        router.push('/admin/blog')
      },
      onError: () => toast.error('No se pudieron guardar los cambios'),
    })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="sticky top-0 z-10 -mx-4 -mt-4 mb-6 border-b border-border bg-background/95 px-4 py-4 backdrop-blur-sm sm:-mx-6 sm:-mt-6 sm:px-6 lg:-mx-8 lg:-mt-8 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link
              href="/admin/blog"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Volver al blog
            </Link>
            <h1 className="mt-1 font-heading text-xl font-semibold text-foreground">
              {mode === 'create' ? 'Nueva entrada de blog' : 'Editar entrada'}
            </h1>
          </div>

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-card px-3.5 py-2 shadow-sm">
            <span className="text-sm font-medium text-foreground">
              {status === 'publicado' ? 'Publicado' : 'Borrador'}
            </span>
            <Switch.Root
              checked={status === 'publicado'}
              onCheckedChange={(checked) => setValue('status', checked ? 'publicado' : 'borrador')}
              className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-input bg-muted transition-colors data-[checked]:border-primary data-[checked]:bg-primary"
            >
              <Switch.Thumb className="block size-4 translate-x-1 rounded-full bg-background shadow transition-transform data-[checked]:translate-x-5" />
            </Switch.Root>
          </label>
        </div>
      </div>

      <FormField>
        <FormLabel htmlFor="title" required>
          Título
        </FormLabel>
        <FormInput id="title" placeholder="Título de la entrada" {...register('title')} />
        {errors.title && <FormError>{errors.title.message}</FormError>}
      </FormField>

      <FormField>
        <FormLabel htmlFor="slug">Slug</FormLabel>
        <FormInput
          id="slug"
          placeholder="se-genera-a-partir-del-titulo"
          {...register('slug', { onChange: () => setSlugTouched(true) })}
        />
        {errors.slug && <FormError>{errors.slug.message}</FormError>}
      </FormField>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField>
          <FormLabel htmlFor="published_at" required>
            Fecha de publicación
          </FormLabel>
          <FormInput id="published_at" type="date" {...register('published_at')} />
          {errors.published_at && <FormError>{errors.published_at.message}</FormError>}
        </FormField>

        <FormField>
          <FormLabel htmlFor="extra_authors">Autores extras</FormLabel>
          <FormInput
            id="extra_authors"
            placeholder="Nombres separados por coma (opcional)"
            {...register('extra_authors')}
          />
          {errors.extra_authors && <FormError>{errors.extra_authors.message}</FormError>}
        </FormField>
      </div>

      <FormField>
        <ImageUpload
          label="Imagen destacada"
          value={featuredImageUrl}
          onChange={(url) => setValue('featured_image_url', url)}
          endpoint="/api/admin/blog/images"
        />
        {errors.featured_image_url && <FormError>{errors.featured_image_url.message}</FormError>}
      </FormField>

      <FormField>
        <FormLabel required>Contenido</FormLabel>
        <Controller
          name="content"
          control={control}
          render={({ field }) => <RichTextEditor value={field.value} onChange={field.onChange} />}
        />
        {errors.content && <FormError>{errors.content.message}</FormError>}
      </FormField>

      <FormSubmit
        disabled={isSubmitting}
        className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60"
      >
        {mode === 'create' ? 'Crear entrada' : 'Guardar cambios'}
      </FormSubmit>
    </Form>
  )
}
