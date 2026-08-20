'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useBlogPost } from '../hooks/useBlogPost'
import { BlogForm } from './BlogForm'

export function BlogEditPage({ id }: { id: string }) {
  const { data: blogPost, isLoading, isError } = useBlogPost(id)

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/blog"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Volver al blog
        </Link>
        <h1 className="mt-2 font-heading text-xl font-semibold text-foreground">Editar entrada</h1>
      </div>

      {isLoading && <p className="text-sm text-muted-foreground">Cargando entrada...</p>}
      {isError && <p className="text-sm text-destructive">No se pudo cargar la entrada.</p>}
      {blogPost && <BlogForm mode="edit" blogPost={blogPost} />}
    </div>
  )
}
