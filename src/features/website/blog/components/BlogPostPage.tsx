import Link from 'next/link'
import { ArrowLeft, CalendarDays, Clock, UserRound } from 'lucide-react'
import type { BlogPost } from '../types'
import { formatBlogDate, readingTime, withHeadingIds } from '../lib/content'
import { ShareButtons } from './ShareButtons'

const contentClassName =
  'max-w-none text-base leading-relaxed text-neutral-700 ' +
  '[&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:scroll-mt-28 [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-kw-secondary ' +
  '[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:font-heading [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-kw-secondary ' +
  '[&_p]:mb-4 [&_a]:font-semibold [&_a]:text-kw-primary [&_a]:underline [&_a]:underline-offset-2 ' +
  '[&_strong]:font-bold [&_strong]:text-kw-secondary ' +
  '[&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1.5 ' +
  '[&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-kw-primary [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-kw-tertiary ' +
  '[&_img]:my-6 [&_img]:w-full [&_img]:rounded-2xl [&_hr]:my-8 [&_hr]:border-neutral-200'

export function BlogPostPage({ post }: { post: BlogPost }) {
  const authorName = [post.author.name, post.author.last_name].filter(Boolean).join(' ')
  const extraAuthors = post.extra_authors?.split(',').map((name) => name.trim()).filter(Boolean) ?? []
  const { html, toc } = withHeadingIds(post.content)
  const minutes = readingTime(post.content)

  return (
    <main className="bg-white pb-20">
      <div className="mx-auto max-w-3xl px-5 pt-8 lg:px-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-kw-tertiary transition-colors hover:text-kw-primary">
          <ArrowLeft size={17} /> Volver al blog
        </Link>

        <header className="mt-6">
          <h1 className="font-heading text-3xl leading-tight font-extrabold text-kw-secondary sm:text-4xl md:text-5xl">
            {post.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-kw-tertiary">
            <span className="flex items-center gap-1.5">
              <UserRound size={15} className="text-kw-primary" />
              {authorName}
              {extraAuthors.length > 0 && `, ${extraAuthors.join(', ')}`}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays size={15} className="text-kw-primary" />
              {formatBlogDate(post.published_at)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={15} className="text-kw-primary" />
              {minutes} min de lectura
            </span>
          </div>
        </header>

        {post.featured_image_url && (
          <img
            src={post.featured_image_url}
            alt={post.title}
            className="mt-8 aspect-16/9 w-full rounded-3xl object-cover shadow-lg"
          />
        )}

        {toc.length > 1 && (
          <nav aria-label="Contenido del artículo" className="mt-10 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
            <p className="mb-3 text-xs font-bold tracking-[0.2em] text-kw-primary uppercase">En este artículo</p>
            <ol className="space-y-2">
              {toc.map((item, index) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="flex gap-2 text-sm font-medium text-kw-secondary hover:text-kw-primary">
                    <span className="text-kw-primary">{index + 1}.</span>
                    {item.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className={contentClassName} dangerouslySetInnerHTML={{ __html: html }} />

        <div className="mt-12 flex flex-col gap-6 border-t border-neutral-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <ShareButtons title={post.title} />
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-kw-primary hover:text-kw-secondary">
            <ArrowLeft size={16} /> Ver más artículos
          </Link>
        </div>
      </div>
    </main>
  )
}
