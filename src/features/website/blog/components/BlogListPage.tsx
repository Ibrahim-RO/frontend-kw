import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { PaginatedBlogPosts } from '../types'
import { BlogCard } from './BlogCard'

export function BlogListPage({ posts }: { posts: PaginatedBlogPosts }) {
  const { data, meta } = posts

  return (
    <main className="bg-neutral-50 pb-20">
      <section className="bg-kw-secondary py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
          <p className="mb-3 text-xs font-bold tracking-[0.3em] text-kw-primary uppercase">KW México</p>
          <h1 className="font-heading text-4xl font-extrabold text-white sm:text-5xl">Blog</h1>
          <p className="mt-4 text-base text-white/70 sm:text-lg">
            Historias, guías y tendencias del mercado inmobiliario de la mano de nuestros agentes.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 pt-12 lg:px-8">
        {data.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((post) => (
              <BlogCard key={post.blog_id} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-neutral-200 bg-white p-16 text-center text-kw-tertiary">
            Todavía no hay entradas publicadas. Vuelve pronto.
          </div>
        )}

        {meta.totalPages > 1 && (
          <nav className="mt-12 flex items-center justify-center gap-4" aria-label="Paginación del blog">
            {meta.hasPreviousPage ? (
              <Link
                href={`/blog?page=${meta.page - 1}`}
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-kw-secondary transition-colors hover:border-kw-primary hover:text-kw-primary"
              >
                <ChevronLeft size={16} /> Anterior
              </Link>
            ) : (
              <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-neutral-200 px-5 py-2.5 text-sm font-semibold text-neutral-300">
                <ChevronLeft size={16} /> Anterior
              </span>
            )}

            <span className="text-sm font-semibold text-kw-tertiary">
              Página {meta.page} de {meta.totalPages}
            </span>

            {meta.hasNextPage ? (
              <Link
                href={`/blog?page=${meta.page + 1}`}
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-kw-secondary transition-colors hover:border-kw-primary hover:text-kw-primary"
              >
                Siguiente <ChevronRight size={16} />
              </Link>
            ) : (
              <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-neutral-200 px-5 py-2.5 text-sm font-semibold text-neutral-300">
                Siguiente <ChevronRight size={16} />
              </span>
            )}
          </nav>
        )}
      </div>
    </main>
  )
}
