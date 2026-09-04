import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogPostPage } from '@/src/features/website/blog/components/BlogPostPage'
import { getPublishedPostBySlug } from '@/src/features/website/blog/dal/blog.dal'
import { excerpt } from '@/src/features/website/blog/lib/content'

export async function generateMetadata({ params }: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const post = await getPublishedPostBySlug(slug)

  if (!post) return { title: 'Blog | KW México' }

  const description = excerpt(post.content, 160)

  return {
    title: `${post.title} | Blog KW México`,
    description,
    openGraph: {
      title: post.title,
      description,
      images: post.featured_image_url ? [post.featured_image_url] : undefined,
    },
  }
}

export default async function Page({ params }: PageProps<'/blog/[slug]'>) {
  const { slug } = await params
  const post = await getPublishedPostBySlug(slug)

  if (!post) notFound()

  return <BlogPostPage post={post} />
}
