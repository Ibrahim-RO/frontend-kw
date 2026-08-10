import { BlogEditPage } from '@/src/features/admin/blog/components/BlogEditPage'

type PageProps = { params: Promise<{ id: string }> }

export default async function Page({ params }: PageProps) {
  const { id } = await params
  return <BlogEditPage id={id} />
}
