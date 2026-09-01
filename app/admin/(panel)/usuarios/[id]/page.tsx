import { UserEditPage } from '@/src/features/admin/users/components/UserEditPage'

type PageProps = { params: Promise<{ id: string }> }

export default async function Page({ params }: PageProps) {
  const { id } = await params
  return <UserEditPage id={id} />
}
