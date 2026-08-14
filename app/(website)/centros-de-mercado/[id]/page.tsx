import { MarketCenterDetailPage } from '@/src/features/website/properties/components/MarketCenterDetailPage'

type PageProps = { params: Promise<{ id: string }> }

export default async function Page({ params }: PageProps) {
  const { id } = await params
  return <MarketCenterDetailPage id={id} />
}
