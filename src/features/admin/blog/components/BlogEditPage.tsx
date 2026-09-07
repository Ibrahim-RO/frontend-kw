'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useBlogPost } from '../hooks/useBlogPost'
import { BlogForm } from './BlogForm'

export function BlogEditPage({ id }: { id: string }) {
  const { data: blogPost, isLoading, isError } = useBlogPost(id)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Link
          href="/admin/blog"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Volver al blog
        </Link>
        <p className="text-sm text-muted-foreground">Cargando entrada...</p>
      </div>
    )
  }

  if (isError || !blogPost) {
    return (
      <div className="space-y-6">
        <Link
          href="/admin/blog"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Volver al blog
        </Link>
        <p className="text-sm text-destructive">No se pudo cargar la entrada.</p>
      </div>
    )
  }

  return <BlogForm mode="edit" blogPost={blogPost} />
}
