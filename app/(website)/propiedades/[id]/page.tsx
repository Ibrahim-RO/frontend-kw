import { PropertyDetailPage } from '@/src/features/website/properties/components/PropertyDetailPage'

type PageProps = { params: Promise<{ id: string }> }

export default async function Page({ params }: PageProps) {
  const { id } = await params
  return <PropertyDetailPage id={id} />
}
