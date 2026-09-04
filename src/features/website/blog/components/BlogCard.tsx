import Link from 'next/link'
import { ArrowRight, CalendarDays } from 'lucide-react'
import type { BlogPost } from '../types'
import { excerpt, formatBlogDate } from '../lib/content'

export function BlogCard({ post }: { post: BlogPost }) {
  const authorName = [post.author.name, post.author.last_name].filter(Boolean).join(' ')

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/blog/${post.slug}`} className="block aspect-16/10 overflow-hidden bg-neutral-100">
        {post.featured_image_url ? (
          <img
            src={post.featured_image_url}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-kw-secondary text-lg font-black text-white/20">KW</div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <p className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-wide text-kw-tertiary uppercase">
          <CalendarDays size={14} className="text-kw-primary" />
          {formatBlogDate(post.published_at)}
          {authorName && <span className="text-neutral-300">·</span>}
          {authorName && <span>{authorName}</span>}
        </p>

        <Link href={`/blog/${post.slug}`}>
          <h2 className="mb-2 line-clamp-2 font-heading text-xl font-bold text-kw-secondary transition-colors group-hover:text-kw-primary">
            {post.title}
          </h2>
        </Link>

        <p className="mb-5 line-clamp-3 flex-1 text-sm leading-relaxed text-kw-tertiary">
          {excerpt(post.content, 150)}
        </p>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-kw-primary transition-colors group-hover:gap-2.5"
        >
          Leer más
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  )
}
