import type { Metadata } from 'next'
import { BlogListPage } from '@/src/features/website/blog/components/BlogListPage'
import { listPublishedPosts } from '@/src/features/website/blog/dal/blog.dal'

export const metadata: Metadata = {
  title: 'Blog | KW México',
  description: 'Historias, guías y tendencias del mercado inmobiliario de la mano de los agentes de KW México.',
}

export default async function Page({ searchParams }: PageProps<'/blog'>) {
  const { page } = await searchParams
  const pageNumber = typeof page === 'string' ? Math.max(1, Number(page) || 1) : 1
  const posts = await listPublishedPosts(pageNumber)

  return <BlogListPage posts={posts} />
}
