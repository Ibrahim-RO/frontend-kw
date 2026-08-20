'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { BlogForm } from './BlogForm'

export function BlogCreatePage() {
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
        <h1 className="mt-2 font-heading text-xl font-semibold text-foreground">Nueva entrada de blog</h1>
      </div>

      <BlogForm mode="create" />
    </div>
  )
}
