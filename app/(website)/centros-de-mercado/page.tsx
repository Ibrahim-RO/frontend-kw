import type { Metadata } from 'next'
import { MarketCentersPage } from '@/src/features/website/properties/components/MarketCentersPage'

export const metadata: Metadata = {
  title: 'Centros de Mercado | KW México',
  description: 'Encuentra el Market Center de Keller Williams México más cercano a ti.',
}

export default function Page() {
  return <MarketCentersPage />
}
