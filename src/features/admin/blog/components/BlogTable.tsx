'use client'

import Link from 'next/link'
import { Pencil, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useBlogPosts } from '../hooks/useBlogPosts'
import { useDeleteBlogPost } from '../hooks/useBlogMutations'
import { BlogStatusBadge } from './BlogStatusBadge'
import { ConfirmDialog } from '@/src/shared/components/ConfirmDialog'

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function BlogTable() {
  const { data, isLoading, isError } = useBlogPosts()
  const deleteMutation = useDeleteBlogPost()

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: () => toast.success('Entrada eliminada'),
      onError: () => toast.error('No se pudo eliminar la entrada'),
    })
  }

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Cargando entradas...</p>
  }

  if (isError) {
    return <p className="text-sm text-destructive">No se pudieron cargar las entradas.</p>
  }

  const posts = data?.data ?? []

  if (posts.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        Todavía no hay entradas de blog. Crea la primera.
      </p>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-medium">Título</th>
            <th className="px-4 py-3 font-medium">Autor</th>
            <th className="px-4 py-3 font-medium">Estado</th>
            <th className="px-4 py-3 font-medium">Publicación</th>
            <th className="px-4 py-3 font-medium text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {posts.map((post) => (
            <tr key={post.blog_id}>
              <td className="px-4 py-3 font-medium text-foreground">{post.title}</td>
              <td className="px-4 py-3 text-muted-foreground">
                {post.author.name} {post.author.last_name}
              </td>
              <td className="px-4 py-3">
                <BlogStatusBadge status={post.status} />
              </td>
              <td className="px-4 py-3 text-muted-foreground">{formatDate(post.published_at)}</td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-1">
                  <Link
                    href={`/admin/blog/${post.blog_id}`}
                    className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    aria-label="Editar"
                  >
                    <Pencil className="size-4" />
                  </Link>
                  <ConfirmDialog
                    trigger={<Trash2 className="size-4" />}
                    triggerClassName="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    title="Eliminar entrada"
                    description={`¿Seguro que quieres eliminar "${post.title}"? Se marcará como eliminada, no se borra el historial.`}
                    confirmLabel="Eliminar"
                    destructive
                    onConfirm={() => handleDelete(post.blog_id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
