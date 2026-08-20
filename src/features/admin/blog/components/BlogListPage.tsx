'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'
import { BlogTable } from './BlogTable'

export function BlogListPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-xl font-semibold text-foreground">Blog</h1>
          <p className="text-sm text-muted-foreground">Administra las entradas del blog.</p>
        </div>
        <Link
          href="/admin/blog/nuevo"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Plus className="size-4" />
          Nueva entrada
        </Link>
      </div>

      <BlogTable />
    </div>
  )
}
